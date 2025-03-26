document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const siNoButtons = document.querySelectorAll('.si-no-btn');
    const opcionButtons = document.querySelectorAll('.opcion-btn');

    // Evento para abrir/cerrar el menú de perfil
    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            toggleElement(profileMenu);
            event.stopPropagation();
        });
    }

    // Evento para cerrar los menús al hacer clic fuera de ellos
    document.addEventListener("click", function () {
        if (profileMenu) {
            profileMenu.classList.add("hidden");
        }
    });

    // Evitar que los clics dentro de los menús cierren los mismos
    if (profileMenu) {
        profileMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    // Función para mostrar/ocultar un elemento
    function toggleElement(element) {
        element.classList.toggle("hidden");
    }

    // Handle Sí/No button clicks
    siNoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.si-no-group');
            optionGroup.querySelectorAll('.si-no-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Handle multiple choice option button clicks
    opcionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.opcion-seleccion');
            optionGroup.querySelectorAll('.opcion-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Function to populate student info (example - you'll need to adapt this)
    function populateStudentInfo(nombre, numControl, carrera, semestre, edad, asistencias) {
        document.getElementById("info-nombre-alumno").textContent = nombre;
        document.getElementById("info-num-control").textContent = numControl;
        document.getElementById("info-carrera").textContent = carrera;
        document.getElementById("info-semestre").textContent = semestre;
        document.getElementById("info-edad").textContent = edad;
        document.getElementById("info-asistencias").textContent = asistencias;
    }

    // Example usage (you'll need to call this function when navigating to this page)
    // You'll need to get the student data and call this function, similar to the initial questionnaire
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const numControl = urlParams.get('control');
    const carrera = urlParams.get('carrera');
    const semestre = urlParams.get('semestre');
    const edad = urlParams.get('edad');
    const asistencias = urlParams.get('asistencias');

    if (nombre && numControl) {
        populateStudentInfo(nombre, numControl, carrera, semestre, edad, asistencias);
    }
});