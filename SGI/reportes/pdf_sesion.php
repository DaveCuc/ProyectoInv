<?php
require_once '../tcpdf/tcpdf.php';
require_once '../conexion.php'; // tu archivo de conexión

// Verificamos si se pasó un ID de sesión por GET
if (!isset($_GET['id_sesion'])) {
    die('ID de sesión no proporcionado.');
}

$id_sesion = $_GET['id_sesion'];

// Consulta para obtener los datos de la sesión y alumno
$sql = "SELECT 
            s.id_sesion, s.fecha, s.asunto, s.seguimiento, s.avances,
            a.nombre AS nombre_alumno, a.numero_control, a.carrera
        FROM sesiones s
        JOIN alumno a ON s.id_alumno = a.id_alumno
        WHERE s.id_sesion = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_sesion);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    die('Sesión no encontrada.');
}

// Crear el PDF
$pdf = new TCPDF();
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('SGI - Psicología');
$pdf->SetTitle('Reporte de Sesión');
$pdf->AddPage();

// Logo del Instituto
$pdf->Image('../img/logo-tec.png', 15, 10, 25); // ruta y tamaño del logo
$pdf->SetFont('helvetica', 'B', 16);
$pdf->Cell(0, 10, 'Tecnológico Nacional de México', 0, 1, 'C');
$pdf->SetFont('helvetica', '', 14);
$pdf->Cell(0, 10, 'Instituto Tecnológico de Tehuacán', 0, 1, 'C');
$pdf->Cell(0, 10, 'Departamento de Psicología', 0, 1, 'C');

$pdf->Ln(5);

// Datos del alumno
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Datos del Alumno', 0, 1);
$pdf->SetFont('helvetica', '', 12);
$pdf->Cell(0, 8, 'Nombre: ' . $data['nombre_alumno'], 0, 1);
$pdf->Cell(0, 8, 'Número de Control: ' . $data['numero_control'], 0, 1);
$pdf->Cell(0, 8, 'Carrera: ' . $data['carrera'], 0, 1);
$pdf->Cell(0, 8, 'Fecha de sesión: ' . $data['fecha'], 0, 1);
$pdf->Cell(0, 8, 'Número de sesión: ' . $data['id_sesion'], 0, 1);

$pdf->Ln(4);

// Asunto tratado
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Asunto tratado:', 0, 1);
$pdf->SetFont('helvetica', '', 12);
$pdf->MultiCell(0, 8, $data['asunto']);

$pdf->Ln(4);

// Seguimiento
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Seguimiento:', 0, 1);
$pdf->SetFont('helvetica', '', 12);
$pdf->MultiCell(0, 8, $data['seguimiento']);

$pdf->Ln(4);

// Avances
$pdf->SetFont('helvetica', 'B', 12);
$pdf->Cell(0, 10, 'Avances vistos:', 0, 1);
$pdf->SetFont('helvetica', '', 12);
$pdf->MultiCell(0, 8, $data['avances']);

$pdf->Output('reporte_sesion_' . $id_sesion . '.pdf', 'I'); // I = inline
?>
