<?php
require 'conexion.php';
include('../conexion.php'); // Asegúrate de tener tu conexión aquí

$id_usuario = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT u.correo, u.rol, s.*
        FROM users u
        JOIN sesiones s ON u.id_usuario = s.id_usuario
        WHERE u.id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("No se encontraron sesiones para este usuario.");
}

$datos = $result->fetch_all(MYSQLI_ASSOC);

// Crear PDF
$pdf = new TCPDF();
$pdf->AddPage();

// Logo y encabezado
$pdf->Image('../img/logo-tehuacan.png', 15, 10, 20);
$pdf->SetFont('helvetica', 'B', 14);
$pdf->Cell(0, 15, "Instituto Tecnológico de Tehuacán", 0, 1, 'C');
$pdf->SetFont('helvetica', '', 12);
$pdf->Cell(0, 10, "Departamento de Psicología", 0, 1, 'C');

$pdf->Ln(10); // Espaciado

foreach ($datos as $row) {
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->Write(0, "Nombre: " . explode('@', $row['correo'])[0], '', 0, 'L', true);
    $pdf->SetFont('helvetica', '', 11);
    $pdf->Write(0, "Número de Sesión: " . $row['id_sesion'], '', 0, 'L', true);
    $pdf->Write(0, "Fecha: " . $row['fecha'], '', 0, 'L', true);
    $pdf->Write(0, "Asunto tratado: " . $row['asunto'], '', 0, 'L', true);
    $pdf->Ln(5);
}

$pdf->Output('reporte_sesion.pdf', 'D'); // descarga directa
?>
