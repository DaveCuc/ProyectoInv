<?php
$host = 'localhost';
$usuario = 'root';
$contrasena = ''; // Cambia si tienes contraseña
$base_datos = 'sgi';

try {
    $conn = new PDO("mysql:host=$host;dbname=$base_datos;charset=utf8", $usuario, $contrasena);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("❌ Error en la conexión: " . $e->getMessage());
}
?>
