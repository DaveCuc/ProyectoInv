document.addEventListener('DOMContentLoaded', () => {
    // Elementos clave de la interfaz
    const searchInput = document.getElementById('busqueda');                            // Campo de búsqueda (por nombre o número de control)
    const alumnosTable = document.querySelector('.alumnos-table tbody');               // Cuerpo de la tabla donde se muestran los alumnos
    const alumnoNombreSpan = document.getElementById('info-num-control');              // Span para mostrar el número de control del alumno seleccionado
    const alumnoEstatusSpan = document.getElementById('info-estatus');                 // Span para mostrar el estatus del alumno
    const mostrarTodosButton = document.querySelector('.mostrar-todos-link-button');   // Botón para mostrar todos los alumnos
    const verInfoButton = document.querySelector('.ver-info-button');                  // Botón para ver la información del alumno
    let selectedAlumno = null;                                                         // Almacena el alumno seleccionado

    // 🔽 Simulación de datos (puede ser reemplazado por fetch desde backend)
    // Backend puede retornar esta estructura desde una API: [{ nombre, carrera, numControl, estatus }]
    let alumnosData = [
        { nombre: 'Alumno 1', carrera: 'Sistemas', numControl: '1234', estatus: 'Activo' },
        { nombre: 'Alumno 2', carrera: 'Bioquímica', numControl: '4321', estatus: 'Inactivo' },
        { nombre: 'Alumno 3', carrera: 'Gestión', numControl: '2134', estatus: 'Activo' },
        { nombre: 'Alumno 4', carrera: 'Mecánica', numControl: '5678', estatus: 'Activo' },
        { nombre: 'Alumno 5', carrera: 'Industrial', numControl: '9012', estatus: 'Inactivo' },
        // Aquí se pueden agregar más alumnos desde el servidor
    ];

    // 🧩 Función que pinta en pantalla la tabla de alumnos
    // Recorre el arreglo y agrega una fila por cada alumno
    function displayAlumnos(alumnos) {
        alumnosTable.innerHTML = ''; // Limpiamos antes de renderizar
        alumnos.forEach(alumno => {
            const row = alumnosTable.insertRow();
            row.insertCell().textContent = alumno.nombre;
            row.insertCell().textContent = alumno.carrera;
            row.insertCell().textContent = alumno.numControl;
            row.dataset.numControl = alumno.numControl; // Guarda el número de control como atributo para referencia

            // Evento al hacer clic en una fila → actualiza la info lateral
            row.addEventListener('click', () => selectAlumno(alumno));
        });
    }

    // 🔍 Filtra por nombre o número de control
    // El backend puede hacer esto también mediante un endpoint tipo:
    // GET /alumnos?filtro=alumno
    function filterAlumnos(searchTerm) {
        const term = searchTerm.toLowerCase();
        return alumnosData.filter(alumno =>
            alumno.nombre.toLowerCase().includes(term) ||
            alumno.numControl.includes(searchTerm)
        );
    }

    // Cada vez que el usuario escribe, se filtra la tabla en tiempo real
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const filteredAlumnos = filterAlumnos(searchTerm);
        displayAlumnos(filteredAlumnos);
    });

    // ✅ Al hacer clic en un alumno: muestra su info al lado
    function selectAlumno(alumno) {
        alumnoNombreSpan.textContent = alumno.nombre;   // Aquí podría ir también un nombre completo si se requiere
        alumnoEstatusSpan.textContent = alumno.estatus;
        selectedAlumno = alumno; // Guarda para saber cuál está activo
    }

    // 🔁 Esta función se ejecuta cuando se hace clic en el botón “Ver información”
    // Redirige a la vista `sesiones-alumno.html`, pasando los datos del alumno por URL
    function verInformacionAlumno() {
        if (selectedAlumno) {
            const url = `sesiones-alumno.html?nombre=${encodeURIComponent(selectedAlumno.nombre)}&numControl=${selectedAlumno.numControl}&carrera=${encodeURIComponent(selectedAlumno.carrera)}`;
            window.location.href = url; // Redirige
        } else {
            alert('Por favor, selecciona un alumno.');
        }
    }

    // 📌 Este botón fuerza la carga de todos los alumnos sin filtros
    // Si hay lógica de backend, aquí puede llamarse un endpoint para obtener todos
    mostrarTodosButton.addEventListener('click', () => {
        displayAlumnos(alumnosData); // Muestra todos
        searchInput.value = '';      // Limpia el campo de búsqueda
    });

    // Inicializa la tabla con todos los alumnos al cargar
    displayAlumnos(alumnosData);
});

document.addEventListener('DOMContentLoaded', function() {
    const filas = document.querySelectorAll('.alumnos-table tbody tr');

    filas.forEach(fila => {
        fila.addEventListener('click', function() {
            // Primero quitamos la selección previa
            filas.forEach(f => f.classList.remove('selected'));
            // Luego agregamos la clase a la fila seleccionada
            this.classList.add('selected');
        });
    });
});
