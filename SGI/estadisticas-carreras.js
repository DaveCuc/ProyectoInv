function mostrarEstadisticas(carrera) {
    console.log(`Mostrar estadísticas para: ${carrera}`);
    // Aquí puedes agregar la lógica para redirigir a la página de detalles de la carrera
    // o mostrar la información en la misma página.
    // Por ejemplo:
    window.location.href = `estadisticas-detalle.html?carrera=${encodeURIComponent(carrera)}`;
}