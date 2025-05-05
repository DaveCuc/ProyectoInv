<?php
require_once '../tcpdf/tcpdf.php';

// Conexión a base de datos
$host = 'localhost';
$usuario = 'root';
$contraseña = '';
$base_datos = 'mydb';
$conn = new mysqli($host, $usuario, $contraseña, $base_datos);
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Obtener ID de sesión
$idSesion = isset($_GET['id_sesion']) ? intval($_GET['id_sesion']) : 0;
if ($idSesion <= 0) {
    die('ID de sesión inválido');
}

// Consulta
$sql = "
    SELECT 
        dp.nombre AS nombre_alumno,
        dp.apellidoP,
        dp.apellidoM,
        a.num_control,
        a.carrera,
        c.fecha,
        c.asunto,
        c.horario,
        c.primera_vez,
        c.asistencia,
        c.estatus_sesion
    FROM citas c
    JOIN alumno a ON a.num_control = c.num_control
    JOIN datos_personales dp ON dp.id_usuario = a.id_usuario
    WHERE c.id_citas = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idSesion);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    die('Sesión no encontrada');
}

$datos = $resultado->fetch_assoc();
$nombreCompleto = $datos['nombre_alumno'] . ' ' . $datos['apellidoP'] . ' ' . $datos['apellidoM'];
$primeraVezTexto = $datos['primera_vez'] == 1 ? 'Sí' : 'No';

// Crear PDF
$pdf = new TCPDF();
$pdf->SetMargins(20, 20, 20);
$pdf->AddPage();

// Logos
$pdf->Image(__DIR__ . '/../img/ittlogo.png', 20, 10, 30);
$pdf->Image(__DIR__ . '/../img/tecnm.jpg', 160, 10, 30);

// Línea horizontal
$pdf->Line(70, 25, 140, 25);
$pdf->Ln(25);

// Título con fondo
$pdf->SetFillColor(0, 102, 204);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'REPORTE DE SESIÓN PSICOLÓGICA', 0, 1, 'C', true);
$pdf->Ln(5);

// Datos
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('helvetica', '', 11);
$pdf->SetCellPadding(2);
function celdaDato($pdf, $titulo, $valor) {
    $pdf->SetFont('', 'B');
    $pdf->Cell(50, 8, $titulo, 0, 0);
    $pdf->SetFont('', '');
    $pdf->Cell(0, 8, $valor, 0, 1);
}
celdaDato($pdf, 'Nombre del Alumno:', $nombreCompleto);
celdaDato($pdf, 'Número de Control:', $datos['num_control']);
celdaDato($pdf, 'Carrera:', $datos['carrera']);
celdaDato($pdf, 'Fecha de Sesión:', $datos['fecha']);
celdaDato($pdf, 'Asunto Tratado:', $datos['asunto']);
celdaDato($pdf, 'Horario:', $datos['horario']);
celdaDato($pdf, 'Primera vez:', $primeraVezTexto);
celdaDato($pdf, 'Asistencia:', $datos['asistencia']);
celdaDato($pdf, 'Estatus de sesión:', $datos['estatus_sesion']);

// Firma sin exceder
$pdf->Ln(12);
$pdf->Line(80, $pdf->GetY(), 130, $pdf->GetY());
$pdf->Ln(4);
$pdf->SetFont('', 'I', 10);
$pdf->Cell(0, 6, 'Psic. Juan Pérez Morales', 0, 1, 'C');
$pdf->Cell(0, 6, 'Psicólogo Responsable', 0, 1, 'C');

// Pie de página manual (más arriba)
$pdf->SetY(265);
$pdf->SetFont('helvetica', 'I', 9);
$pdf->Line(20, $pdf->GetY(), 190, $pdf->GetY());
$pdf->SetTextColor(60, 60, 200);
$pdf->Cell(0, 10, 'SGI - Sistema de Gestión de Información | Tecnológico de Tehuacán', 0, 0, 'C');

// Descargar
$nombreLimpio = preg_replace('/\s+/', '_', $nombreCompleto);
$nombreArchivo = 'Reporte_' . $nombreLimpio . '_' . $datos['fecha'] . '.pdf';
$pdf->Output($nombreArchivo, 'D');
?>
