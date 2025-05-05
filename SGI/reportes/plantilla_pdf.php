<?php
function generarHTMLSesion($datos, $tecnicas, $motivos, $padecimientos)
{
    ob_start();
    ?>
    <style>
        h2 {
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .info {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            margin-bottom: 5px;
        }
        .firma {
            margin-top: 40px;
            text-align: right;
            font-family: Arial, sans-serif;
        }
    </style>

    <h2>REPORTE DE SESIÓN PSICOLÓGICA</h2>

    <div class="info"><strong>Nombre del Alumno:</strong> <?= $datos['nombre_alumno'] ?></div>
    <div class="info"><strong>Número de Control:</strong> <?= $datos['num_control'] ?></div>
    <div class="info"><strong>Carrera:</strong> <?= $datos['carrera'] ?></div>
    <div class="info"><strong>Fecha de Sesión:</strong> <?= $datos['fecha'] ?></div>
    <div class="info"><strong>Asunto Tratado:</strong> <?= $datos['asunto'] ?></div>
    <div class="info"><strong>Horario:</strong> <?= $datos['hora'] ?></div>
    <div class="info"><strong>Primera vez:</strong> <?= $datos['primera_vez'] ? 'Sí' : 'No' ?></div>
    <div class="info"><strong>Asistencia:</strong> <?= $datos['asistencia'] ?></div>
    <div class="info"><strong>Estatus de sesión:</strong> <?= $datos['estatus'] ?></div>

    <br><hr><br>

    <div class="info"><strong>Técnicas empleadas:</strong>
        <ul>
            <?php foreach ($tecnicas as $t): ?>
                <li><?= $t ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="info"><strong>Motivo(s) de consulta:</strong>
        <ul>
            <?php foreach ($motivos as $m): ?>
                <li><?= $m ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="info"><strong>Padecimiento actual:</strong>
        <ul>
            <?php foreach ($padecimientos as $p): ?>
                <li><?= $p ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="firma">
        ___________________________<br>
        Psicólogo Responsable
    </div>

    <?php
    return ob_get_clean();
}
?>
