<?php
require_once '../tcpdf/tcpdf.php';

// Conexión
$conn = new mysqli('localhost', 'root', '', 'mydb');
if ($conn->connect_error) die('Error de conexión: ' . $conn->connect_error);

// ID de sesión
$idSesion = isset($_GET['id_sesion']) ? intval($_GET['id_sesion']) : 0;
if ($idSesion <= 0) die('ID de sesión inválido');

// ================= CONSULTAS ================= //
$sql = "
    SELECT 
        dp.nombre AS nombre_alumno, dp.apellidoP, dp.apellidoM,
        a.num_control, a.carrera,
        c.fecha, c.asunto, c.horario, c.primera_vez, c.asistencia, c.estatus_sesion,
        p.id_psicologo,
        dps.nombre AS nombre_psicologo, dps.apellidoP AS apellidoP_psicologo, dps.apellidoM AS apellidoM_psicologo
    FROM citas c
    JOIN alumno a ON a.num_control = c.num_control
    JOIN datos_personales dp ON dp.id_usuario = a.id_usuario
    JOIN psicologo p ON p.id_psicologo = c.id_psicologo
    JOIN datos_personales dps ON dps.id_usuario = p.id_usuario
    WHERE c.id_citas = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idSesion);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows === 0) die('Sesión no encontrada');
$datos = $res->fetch_assoc();

$nombreAlumno = $datos['nombre_alumno'] . ' ' . $datos['apellidoP'] . ' ' . $datos['apellidoM'];
$nombrePsicologo = 'Psic. ' . $datos['nombre_psicologo'] . ' ' . $datos['apellidoP_psicologo'] . ' ' . $datos['apellidoM_psicologo'];
$numControl = $datos['num_control'];
$idPsicologo = $datos['id_psicologo'];

// ID del cuestionario
$idCuestionario = 0;
$stmt = $conn->prepare("SELECT id_cuestionario FROM cuestionario WHERE num_control = ? AND id_psicologo = ? ORDER BY fecha DESC LIMIT 1");
$stmt->bind_param("ii", $numControl, $idPsicologo);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows > 0) $idCuestionario = $res->fetch_assoc()['id_cuestionario'];

// Motivos
$motivos = [];
$res = $conn->query("SELECT m.descripcion FROM cuestionario_has_motivo chm JOIN motivo m ON m.id_motivo = chm.id_motivo WHERE chm.id_cuestionario = $idCuestionario");
while ($row = $res->fetch_assoc()) $motivos[] = $row['descripcion'];

// Técnicas
$tecnicas = [];
$res = $conn->query("SELECT t.tecnica FROM cuestionario_has_tecnicas_instrumetnacion cht JOIN tecnicas_instrumetnacion t ON t.id_tecnicas = cht.id_tecnicas WHERE cht.id_cuestionario = $idCuestionario");
while ($row = $res->fetch_assoc()) $tecnicas[] = $row['tecnica'];

// Padecimiento actual
$padecimiento = '';
$res = $conn->query("SELECT descripcion FROM padecimiento_actual WHERE id_cuestionario = $idCuestionario LIMIT 1");
if ($res->num_rows > 0) $padecimiento = $res->fetch_assoc()['descripcion'];

// Familiares
$familiares = [];
$res = $conn->query("SELECT nombre, edad, nivel_escolaridad, ocupacion, tipo FROM familiar WHERE num_control = $numControl");
while ($row = $res->fetch_assoc()) $familiares[] = $row;

// Antecedentes
$antecedentes = null;
$res = $conn->query("SELECT * FROM antecedentes_familiares WHERE id_cuestionario = $idCuestionario");
if ($res->num_rows > 0) $antecedentes = $res->fetch_assoc();

// ================= PDF ================= //
class CustomPDF extends TCPDF {
    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica', '', 8);
        $this->SetTextColor(150, 150, 150);
        $this->Cell(0, 5, 'SGI - Sistema Integral de Información | Tecnológico de Tehuacán', 0, 0, 'C');
    }
}
$pdf = new CustomPDF();
$pdf->SetMargins(20, 20, 20);
$pdf->AddPage();

// Logos
$pdf->Image(__DIR__ . '/../img/ittlogo.png', 20, 10, 20);
$pdf->Image(__DIR__ . '/../img/tecnm.jpg', 170, 10, 20);

// Título institucional
$pdf->SetFont('helvetica', 'B', 10);
$pdf->SetY(15);
$pdf->Cell(0, 10, 'TECNOLOGICO NACIONAL DE MEXICO', 0, 1, 'C');
$pdf->Cell(0, 5, 'INSTITUTO TECNOLOGICO DE TEHUACAN', 0, 1, 'C');
$pdf->Ln(5);

// Título reporte
$pdf->SetFont('helvetica', 'B', 11);
$pdf->SetFillColor(21, 101, 192);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(0, 10, 'REPORTE DE SESIÓN PSICOLÓGICA', 0, 1, 'C', 1);
$pdf->Ln(2);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('helvetica', '', 10);

// Función para celdas de datos
function celdaDato($pdf, $titulo, $valor) {
    $pdf->SetFont('', 'B'); $pdf->Cell(45, 7, $titulo, 0, 0);
    $pdf->SetFont('', '');  $pdf->Cell(0, 7, $valor, 0, 1);
}

// Datos del alumno
celdaDato($pdf, 'Nombre del Alumno:', $nombreAlumno);
celdaDato($pdf, 'Número de Control:', $numControl);
celdaDato($pdf, 'Carrera:', $datos['carrera']);
celdaDato($pdf, 'Fecha de Sesión:', $datos['fecha']);
celdaDato($pdf, 'Asunto Tratado:', $datos['asunto']);
celdaDato($pdf, 'Horario:', $datos['horario']);
celdaDato($pdf, 'Primera vez:', $datos['primera_vez'] ? 'Sí' : 'No');
celdaDato($pdf, 'Asistencia:', $datos['asistencia']);
celdaDato($pdf, 'Estatus de sesión:', $datos['estatus_sesion']);

$pdf->Ln(7); // espacio DESPUÉS de la tabla de motivos

// Motivos
$pdf->Ln(2);
$pdf->SetFillColor(21, 101, 192);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(0, 7, 'Motivos de Consulta', 0, 1, 'C', 1);
$pdf->SetTextColor(0, 0, 0);
foreach ($motivos as $m) {
    $pdf->Cell(0, 7, '- ' . ucfirst($m), 1, 1, 'C');
}

$pdf->Ln(8); // espacio DESPUÉS de la tabla de motivos


// Padecimiento actual
if ($padecimiento) {
    $pdf->Ln(2);
    $pdf->SetFillColor(21, 101, 192);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(0, 7, 'Padecimiento Actual', 0, 1, 'C', 1);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->MultiCell(0, 6, $padecimiento, 1);
}

$pdf->Ln(8); // espacio DESPUÉS de la tabla de motivos


// Técnicas
if (!empty($tecnicas)) {
    $pdf->Ln(2);
    $pdf->SetFillColor(21, 101, 192);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(0, 7, 'Técnicas e Instrumentación Aplicadas', 0, 1, 'C', 1);
    $pdf->SetTextColor(0, 0, 0);
    foreach ($tecnicas as $tec) {
        $pdf->SetFont('', 'B');
        $pdf->Cell(0, 7, strtolower($tec), 1, 1, 'C');
    }
}

$pdf->Ln(8); // espacio DESPUÉS de la tabla de motivos


// Tabla de Familiares
if (!empty($familiares)) {
    // Título
$pdf->Ln(4);
$pdf->SetFillColor(21, 101, 192);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(0, 7, 'Datos de Familiares', 0, 1, 'C', 1);

$pdf->SetTextColor(0, 0, 0); // Volver a negro para las celdas

// Encabezados
$anchoTotal = 170;
$startX = ($pdf->GetPageWidth() - $anchoTotal) / 2;
$pdf->SetX($startX);
$pdf->SetFont('', 'B');
$pdf->SetFillColor(255, 220, 230);
$pdf->Cell(40, 8, 'Nombre', 1, 0, 'C', 1);
$pdf->Cell(15, 8, 'Edad', 1, 0, 'C', 1);
$pdf->Cell(40, 8, 'Escolaridad', 1, 0, 'C', 1);
$pdf->Cell(45, 8, 'Ocupación', 1, 0, 'C', 1);
$pdf->Cell(30, 8, 'Tipo', 1, 1, 'C', 1);


// Datos
$pdf->SetFont('', '');
foreach ($familiares as $f) {
    $pdf->SetX($startX);
    $pdf->Cell(40, 8, $f['nombre'], 1, 0, 'C');
    $pdf->Cell(15, 8, $f['edad'], 1, 0, 'C');
    $pdf->Cell(40, 8, $f['nivel_escolaridad'], 1, 0, 'C');
    $pdf->Cell(45, 8, $f['ocupacion'], 1, 0, 'C');
    $pdf->Cell(30, 8, $f['tipo'], 1, 1, 'C'); // 1 en el penúltimo parámetro indica salto de línea
}

}

$pdf->Ln(8); // espacio DESPUÉS de la tabla de motivos


// ANTECEDENTES (NUEVA PÁGINA)
if ($antecedentes) {
    $pdf->AddPage();
    $pdf->SetFillColor(21, 101, 192);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Cell(0, 7, 'Antecedentes Familiares', 0, 1, 'C', 1);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->Ln(1);
    $pdf->SetFont('', '');

    $labels = [
        "Padres Juntos" => $antecedentes['padres_juntos'] ? 'Sí' : 'No',
        "Padre Fallecido" => $antecedentes['padre_fallecido'] ? 'Sí' : 'No',
        "Madre Fallecida" => $antecedentes['madre_fallecido'] ? 'Sí' : 'No',
        "Conflictos con Padre" => $antecedentes['conflictos_padre'] ? 'Sí' : 'No',
        "Conflictos con Madre" => $antecedentes['conflictos_madre'] ? 'Sí' : 'No',
        "Conflictos con Otros" => $antecedentes['conflictos_otros'] ? 'Sí' : 'No',
        "Actitud de Padres" => ucfirst($antecedentes['actitud_padres']),
        "Lugar donde vive" => $antecedentes['lugar'],
        "¿Con quién vive actualmente?" => $antecedentes['vive_actualmente'],
        "Problemas Familiares" => $antecedentes['problemas_fam'],
        "Antecedentes Escolares Familiares" => ucfirst($antecedentes['antecedentes_familiarescol']),
        "Nº Hermanos" => $antecedentes['num_hermanos'],
        "Nº Hermanas" => $antecedentes['num_hermanas'],
        "Relación entre Hermanos" => ucfirst($antecedentes['relacion_hermanos']),
    ];

    foreach ($labels as $k => $v) {
        $pdf->SetFont('', 'B'); $pdf->Cell(70, 7, $k . ':', 0, 0);
        $pdf->SetFont('', '');  $pdf->MultiCell(0, 7, $v, 0);
    }

$pdf->Ln(19); // espacio DESPUÉS de la tabla de motivos


    // Firma
    $pdf->Ln(12);
    $pdf->Line(70, $pdf->GetY(), 140, $pdf->GetY());
    $pdf->Ln(4);
    $pdf->SetFont('', 'B');
    $pdf->Cell(0, 6, $nombrePsicologo, 0, 1, 'C');
    $pdf->SetFont('', '');
    $pdf->Cell(0, 6, 'Psicólogo Responsable', 0, 1, 'C');
}

// Nombre personalizado
$nombreArchivo = 'Reporte_' . preg_replace('/\s+/', '_', $nombreAlumno) . '_' . $datos['fecha'] . '.pdf';
$pdf->Output($nombreArchivo, 'D');
