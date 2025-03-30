document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreCarreraSpanTitulo = document.getElementById('nombre-carrera');
    const tituloEstadisticas = document.getElementById('titulo-estadisticas');
    const areaCarreraSpan = document.getElementById('area-carrera');
    const numAlumnosSpan = document.getElementById('num-alumnos');

    const carrera = urlParams.get('carrera');

    if (carrera) {
        nombreCarreraSpanTitulo.textContent = carrera;
        tituloEstadisticas.textContent = `Estadísticas de ${carrera}`;
        // Aquí podrías obtener y mostrar la información específica de la carrera
        // Por ahora, vamos a mostrar datos genéricos.
        areaCarreraSpan.textContent = obtenerAreaCarrera(carrera);
        numAlumnosSpan.textContent = obtenerNumAlumnos(carrera);
    } else {
        // Manejar el caso en que no se proporciona la carrera en la URL
        nombreCarreraSpanTitulo.textContent = 'Carrera no especificada';
        tituloEstadisticas.textContent = 'Estadísticas de Carrera no especificada';
    }

    // Funciones de ejemplo para obtener datos (reemplazar con tu lógica real)
    function obtenerAreaCarrera(carrera) {
        switch (carrera) {
            case 'Bioquímica':
            case 'Industrial':
            case 'Biomédica':
                return 'Ingeniería';
            case 'Civil':
            case 'Electrónica':
            case 'Mecatrónica':
            case 'Sistemas Computacionales':
                return 'Ingeniería';
            case 'Gestión Empresarial':
            case 'Logística':
            case 'Administración de Empresas':
            case 'Contador Público':
                return 'Administración';
            default:
                return 'Desconocida';
        }
    }

    function obtenerNumAlumnos(carrera) {
        // Aquí iría la lógica para obtener el número de alumnos por carrera
        return Math.floor(Math.random() * 200) + 50; // Ejemplo aleatorio
    }
});