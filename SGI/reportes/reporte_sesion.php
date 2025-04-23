<?php
require 'conexion.php';
require 'dompdf/autoload.inc.php';

use Dompdf\Dompdf;

$id_sesion = isset($_GET['id_sesion']) ? $_GET['id_sesion'] : 1;

$sql = "SELECT * FROM sesiones WHERE id_sesion = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id_sesion]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$data) {
    die('Sesión no encontrada.');
}

$html = "
    <h2 style='text-align:center;'>Instituto Tecnológico de Tehuacán</h2>
    <h4 style='text-align:center;'>Departamento de Psicología</h4>
    <hr>
    <h3>Reporte de Sesión</h3>
    <p><strong>Nombre del alumno:</strong> {$data['nombre_alumno']}</p>
    <p><strong>Número de control:</strong> {$data['numero_control']}</p>
    <p><strong>Carrera:</strong> {$data['carrera']}</p>
    <p><strong>Fecha:</strong> {$data['fecha']}</p>
    <p><strong>Asunto tratado:</strong><br>{$data['asunto']}</p>
    <p><strong>Seguimiento:</strong><br>{$data['seguimiento']}</p>
    <p><strong>Avances:</strong><br>{$data['avances']}</p>
";

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->render();
$dompdf->stream("reporte_sesion_$id_sesion.pdf", ["Attachment" => 0]);
