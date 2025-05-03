<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Sesión</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; margin: 40px; }
        h2 { text-align: center; }
        .campo { font-weight: bold; margin-top: 12px; }
    </style>
</head>
<body>
    <h2>REPORTE DE SESIÓN PSICOLÓGICA</h2>

    <p><span class="campo">Nombre del Alumno:</span> <?= $datos['nombre'] . ' ' . $datos['apellidoP'] . ' ' . $datos['apellidoM'] ?></p>
    <p><span class="campo">Número de Control:</span> <?= $datos['num_control'] ?></p>
    <p><span class="campo">Carrera:</span> <?= $datos['carrera'] ?></p>
    <p><span class="campo">Fecha de Sesión:</span> <?= $datos['fecha'] ?></p>
    <p><span class="campo">Asunto Tratado:</span> <?= $datos['asunto'] ?></p>
    <p><span class="campo">Horario:</span> <?= $datos['horario'] ?></p>
    <p><span class="campo">Primera vez:</span> <?= $datos['primera_vez'] ? 'Sí' : 'No' ?></p>
    <p><span class="campo">Asistencia:</span> <?= $datos['asistencia'] ?></p>
    <p><span class="campo">Estatus de sesión:</span> <?= $datos['estatus_sesion'] ?></p>

    <p style="margin-top: 40px; text-align: right;">__________________________<br>Psicólogo Responsable</p>
</body>
</html>
