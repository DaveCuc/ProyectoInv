<?php
require '../dompdf/autoload.inc.php';
use Dompdf\Dompdf;

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "mydb");
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener el ID de la sesión desde la URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
    die("ID inválido.");
}

// Consulta SQL con JOIN para traer todos los datos
$sql = "
    SELECT c.*, a.carrera, a.num_control, d.nombre, d.apellidoP, d.apellidoM
    FROM citas c
    INNER JOIN alumno a ON a.num_control = c.num_control
    INNER JOIN datos_personales d ON d.id_usuario = a.id_usuario
    WHERE c.id_citas = $id
";

$resultado = $conexion->query($sql);
if ($resultado->num_rows === 0) {
    die("No se encontró la sesión.");
}

$datos = $resultado->fetch_assoc();
$conexion->close();

// Cargar la plantilla HTML
ob_start();
include 'plantilla_pdf.php';
$html = ob_get_clean();

// Generar el PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
$dompdf->stream("reporte_sesion_$id.pdf", ["Attachment" => false]);
