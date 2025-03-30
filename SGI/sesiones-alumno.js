document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreAlumnoSpan = document.getElementById('nombre-alumno');
    const numControlSpan = document.getElementById('num-control');
    const carreraSpan = document.getElementById('carrera');
    const tablaSesionesBody = document.getElementById('tabla-sesiones');
    const numSesionesSpan = document.getElementById('num-sesiones');
    const faltasSpan = document.getElementById('faltas');
    const cancelacionesSpan = document.getElementById('cancelaciones');
    const asistidasSpan = document.getElementById('asistidas');
    const verMasInfoButton = document.querySelector('.ver-info-button'); // Referencia al nuevo botón

    const nombre = urlParams.get('nombre');
    const numControl = urlParams.get('numControl');
    const carrera = urlParams.get('carrera');

    // Mostrar la información del alumno
    nombreAlumnoSpan.textContent = nombre;
    numControlSpan.textContent = numControl;
    carreraSpan.textContent = carrera;

    // Datos de ejemplo de las sesiones del alumno (reemplazar con tu lógica real)
    const sesionesAlumno = [
        { fecha: '12/02/2025', asunto: 'Problema 1', pdf: 'sesion1.pdf' },
        { fecha: '19/02/2025', asunto: 'Seguimiento', pdf: 'sesion2.pdf' },
        { fecha: '26/02/2025', asunto: 'Avance', pdf: 'sesion3.pdf' },
    ];

    // Llenar la tabla de sesiones
    sesionesAlumno.forEach(sesion => {
        const row = tablaSesionesBody.insertRow();
        row.insertCell().textContent = sesion.fecha;
        row.insertCell().textContent = sesion.asunto;
        const descargarCell = row.insertCell();
        const linkDescarga = document.createElement('a');
        linkDescarga.href = sesion.pdf;
        linkDescarga.textContent = 'Descargar';
        descargarCell.appendChild(linkDescarga);
    });

    // Datos de ejemplo de información adicional (reemplazar con tu lógica real)
    const infoAdicional = {
        numSesiones: sesionesAlumno.length,
        faltas: 0,
        cancelaciones: 0,
        asistidas: sesionesAlumno.length,
    };

    // Mostrar la información adicional
    numSesionesSpan.textContent = infoAdicional.numSesiones;
    faltasSpan.textContent = infoAdicional.faltas;
    cancelacionesSpan.textContent = infoAdicional.cancelaciones;
    asistidasSpan.textContent = infoAdicional.asistidas;

    // Evento para el botón "Ver más Información" (puedes añadir funcionalidad aquí si es necesario)
    verMasInfoButton.addEventListener('click', () => {
        console.log('Botón Ver más Información clickeado');
        // Aquí podrías redirigir a otra página con más detalles del alumno si lo deseas.
    });
});