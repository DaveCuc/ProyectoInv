<?php
require_once('../tcpdf/tcpdf.php');
require_once('../conexion.php'); // Ajusta si tu archivo de conexión tiene otro nombre

$id = $_GET['id'] ?? '';
if (!$id) {
    die('ID de cita no proporcionado.');
}

// Obtener datos de la cita
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$stmt = $conn->prepare("
    SELECT 
        dp.nombre, dp.apellidoP, dp.apellidoM, a.carrera,
        c.fecha, c.horario, c.primera_vez, c.asistencia, 
        c.estatus_sesion, c.asunto, c.num_control
    FROM citas c
    JOIN alumno a ON c.num_control = a.num_control
    JOIN datos_personales dp ON a.id_usuario = a.id_usuario
    WHERE c.id_citas = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
if (!$data) {
    die('No se encontró la cita.');
}

// Crear PDF
$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$html = '
<h2 style="text-align:center;">REPORTE DE SESIÓN PSICOLÓGICA</h2>
<p><strong>Nombre del Alumno:</strong> ' . $data['nombre'] . ' ' . $data['apellidoP'] . ' ' . $data['apellidoM'] . '</p>
<p><strong>Número de Control:</strong> ' . $data['num_control'] . '</p>
<p><strong>Carrera:</strong> ' . $data['carrera'] . '</p>
<p><strong>Fecha de Sesión:</strong> ' . $data['fecha'] . '</p>
<p><strong>Asunto Tratado:</strong> ' . $data['asunto'] . '</p>
<p><strong>Horario:</strong> ' . $data['horario'] . '</p>
<p><strong>Primera vez:</strong> ' . ($data['primera_vez'] ? 'Sí' : 'No') . '</p>
<p><strong>Asistencia:</strong> ' . $data['asistencia'] . '</p>
<p><strong>Estatus de sesión:</strong> ' . $data['estatus_sesion'] . '</p>
<br><br><br>
<p style="text-align:right;">_________________________<br>Psicólogo Responsable</p>
';

$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output('reporte_sesion.pdf', 'I');
?>
