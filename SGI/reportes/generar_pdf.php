<?php
require 'dompdf/autoload.inc.php';
require 'conexion.php';

use Dompdf\Dompdf;

// CONSULTA DE PRUEBA
$query = $conn->query("SELECT nombre, num_control, carrera FROM alumno LIMIT 5");
$alumnos = $query->fetchAll(PDO::FETCH_ASSOC);

// INICIO DEL HTML PARA EL PDF
$html = '
<h1 style="text-align:center; font-family:sans-serif;">Reporte de Alumnos</h1>
<table border="1" cellspacing="0" cellpadding="6" style="width:100%; font-family:sans-serif;">
    <thead>
        <tr style="background:#f0f0f0;">
            <th>Nombre</th>
            <th>Núm. Control</th>
            <th>Carrera</th>
        </tr>
    </thead>
    <tbody>';
foreach ($alumnos as $alumno) {
    $html .= "<tr>
                <td>{$alumno['nombre']}</td>
                <td>{$alumno['num_control']}</td>
                <td>{$alumno['carrera']}</td>
              </tr>";
}
$html .= '</tbody></table>';

// GENERACIÓN DEL PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$dompdf->stream("reporte_alumnos.pdf", array("Attachment" => false));
?>
