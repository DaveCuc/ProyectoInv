<?php
require '../dompdf/autoload.inc.php';
use Dompdf\Dompdf;

// Simulación de datos (reemplázalo por $_GET o DB más adelante)
$datos = [
    'nombre' => 'Juan',
    'apellidoP' => 'Pérez',
    'apellidoM' => 'Ramírez',
    'num_control' => '2136939',
    'carrera' => 'Psicología',
    'fecha' => '2025-05-05',
    'asunto' => 'Ansiedad por exámenes',
    'horario' => '10:00',
    'primera_vez' => 1,
    'asistencia' => 'Pendiente',
    'estatus_sesion' => 'Programada'
];

// Cargar la vista
ob_start();
include 'plantilla_pdf.php';
$html = ob_get_clean();

// Generar el PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$dompdf->stream("reporte_sesion.pdf", ["Attachment" => false]);
