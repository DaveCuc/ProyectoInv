document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('busqueda');
    const alumnosTable = document.querySelector('.alumnos-table tbody');
    const alumnoNombreSpan = document.getElementById('info-num-control');
    const alumnoEstatusSpan = document.getElementById('info-estatus');
    const mostrarTodosButton = document.querySelector('.mostrar-todos-link-button');
    const verInfoButton = document.querySelector('.ver-info-button'); // Aseguramos tener la referencia al botón
    let alumnosData = [
        { nombre: 'Alumno 1', carrera: 'Sistemas', numControl: '1234', estatus: 'Activo' },
        { nombre: 'Alumno 2', carrera: 'Bioquímica', numControl: '4321', estatus: 'Inactivo' },
        { nombre: 'Alumno 3', carrera: 'Gestión', numControl: '2134', estatus: 'Activo' },
        { nombre: 'Alumno 4', carrera: 'Mecánica', numControl: '5678', estatus: 'Activo' },
        { nombre: 'Alumno 5', carrera: 'Industrial', numControl: '9012', estatus: 'Inactivo' },
        // ... más datos de alumnos
    ];
    let selectedAlumno = null; // Variable para almacenar el alumno seleccionado

    function displayAlumnos(alumnos) {
        alumnosTable.innerHTML = '';
        alumnos.forEach(alumno => {
            const row = alumnosTable.insertRow();
            row.insertCell().textContent = alumno.nombre;
            row.insertCell().textContent = alumno.carrera;
            row.insertCell().textContent = alumno.numControl;
            row.dataset.numControl = alumno.numControl;
            row.addEventListener('click', () => selectAlumno(alumno));
        });
    }

    function filterAlumnos(searchTerm) {
        const term = searchTerm.toLowerCase();
        return alumnosData.filter(alumno =>
            alumno.nombre.toLowerCase().includes(term) ||
            alumno.numControl.includes(searchTerm)
        );
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const filteredAlumnos = filterAlumnos(searchTerm);
        displayAlumnos(filteredAlumnos);
    });

    function selectAlumno(alumno) {
        alumnoNombreSpan.textContent = alumno.nombre;
        alumnoEstatusSpan.textContent = alumno.estatus;
        selectedAlumno = alumno; // Guardamos el alumno seleccionado
    }

    function verInformacionAlumno() {
        if (selectedAlumno) {
            const url = `sesiones-alumno.html?nombre=${encodeURIComponent(selectedAlumno.nombre)}&numControl=${selectedAlumno.numControl}&carrera=${encodeURIComponent(selectedAlumno.carrera)}`;
            window.location.href = url;
        } else {
            alert('Por favor, selecciona un alumno.');
        }
    }

    mostrarTodosButton.addEventListener('click', () => {
        displayAlumnos(alumnosData);
        searchInput.value = '';
    });

    displayAlumnos(alumnosData);
});