<?php
    // Configuración de la página
    $titulo = "Página Simple en PHP";
    $mensaje = "¡Bienvenido a mi página PHP!";
    $fecha = date("d-m-Y H:i:s");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titulo; ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1><?php echo $mensaje; ?></h1>
        <p>La fecha y hora actual es: <?php echo $fecha; ?></p>
    </div>
</body>
</html>
