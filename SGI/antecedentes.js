document.addEventListener('DOMContentLoaded', function() {
    // === PERFIL DEL USUARIO (MENÚ FLotante) ===
    const profileIcon = document.getElementById("profile-icon"); // Icono de usuario en el header
    const profileMenu = document.getElementById("profile-menu"); // Menú flotante con cerrar sesión, etc.

    // === BOTONES DE SELECCIÓN (Formulario) ===
    const siNoButtons = document.querySelectorAll('.si-no-btn');       // Botones de sí/no
    const opcionButtons = document.querySelectorAll('.opcion-btn');    // Botones de opción única

    // ==== MENÚ DE PERFIL: Mostrar/Ocultar ====
    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            toggleElement(profileMenu);
            event.stopPropagation(); // Previene que se cierre al hacer clic dentro
        });
    }

    document.addEventListener("click", function () {
        if (profileMenu) profileMenu.classList.add("hidden");
    });

    if (profileMenu) {
        profileMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    function toggleElement(element) {
        element.classList.toggle("hidden");
    }

    // === GESTIÓN DE BOTONES SÍ / NO ===
    // Cada grupo tiene 2 botones: sí/no. El seleccionado se marca con .selected
    // Backend debe capturar el atributo `data-option` como clave y `data-value` como valor
    // Ejemplo: { padres_juntos: "no", conflictos_madre: "si" }
    siNoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.si-no-group');
            optionGroup.querySelectorAll('.si-no-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // === GESTIÓN DE BOTONES DE OPCIÓN ÚNICA ===
    // Similar a un input tipo radio. Solo uno puede estar seleccionado por categoría.
    // Cada botón tiene: data-opcion y data-value
    // Ejemplo: { actitud_padres: "hostil", relacion_hermanos: "afectuosa" }
    opcionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.opcion-seleccion');
            optionGroup.querySelectorAll('.opcion-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // === FUNCIÓN PARA CARGAR DATOS DEL ALUMNO EN LA TARJETA SUPERIOR ===
    // Estos datos se deben enviar desde la vista anterior como parámetros en la URL.
    // El backend debe redirigir incluyendo esos datos: ejemplo:
    // location.href = "antecedentes.html?nombre=Juan Pérez&control=123456&carrera=ITI&semestre=5&edad=20&asistencias=2"
    function populateStudentInfo(nombre, numControl, carrera, semestre, edad, asistencias) {
        document.getElementById("info-nombre-alumno").textContent = nombre;
        document.getElementById("info-num-control").textContent = numControl;
        document.getElementById("info-carrera").textContent = carrera;
        document.getElementById("info-semestre").textContent = semestre;
        document.getElementById("info-edad").textContent = edad;
        document.getElementById("info-asistencias").textContent = asistencias;
    }

    // === EXTRAER LOS DATOS DESDE LA URL (pasados por la vista anterior) ===
    // Si estos valores están presentes, se usan para rellenar la tarjeta del alumno
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
