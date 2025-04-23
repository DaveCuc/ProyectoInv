<?php
$host = 'localhost';
$dbname = 'sgi_demo'; // Asegúrate que sea el mismo nombre que importaste
$usuario = 'root';
$clave = ''; // Si usas XAMPP normalmente está vacío

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $usuario, $clave);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "✅ Conexión exitosa";
} catch (PDOException $e) {
    die("❌ Error de conexión: " . $e->getMessage());
}
?>
