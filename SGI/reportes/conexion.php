<?php
// conexion.php

$host = 'localhost';
$usuario = 'root';
$contrasena = ''; // sin contraseña por defecto en XAMPP
$base_datos = 'mydb'; // cambia si tu base tiene otro nombre

$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}
?>
