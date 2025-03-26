document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const motivoButtons = document.querySelectorAll(".motivo-btn");
    const otrosEspecificar = document.getElementById("otros-especificar");

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

    // Handle motivo button clicks
    motivoButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("selected");
        });
    });

    // Disable/enable "Especifique" based on "Otros" selection
    const otrosButton = document.querySelector(".motivo-btn[data-motivo='otros']");
    if (otrosButton && otrosEspecificar) {
        otrosEspecificar.disabled = !otrosButton.classList.contains("selected");
        otrosButton.addEventListener("click", function() {
            otrosEspecificar.disabled = !this.classList.contains("selected");
        });
    }

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
    // populateStudentInfo("Juan Pérez", "123456", "Ingeniería en Sistemas", "5to", "20", "3");
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (Previous JavaScript code for profile menu and initial questionnaire) ...

    const siguienteInicialBtn = document.getElementById('siguiente-inicial');
    const atrasFamiliaresBtn = document.getElementById('atras-familiares');
    const siguienteFamiliaresBtn = document.getElementById('siguiente-familiares');
    const inicialQuestionnaireSection = document.getElementById('initial-questionnaire');
    const familyBackgroundSection = document.getElementById('family-background');
    const siNoButtons = document.querySelectorAll('.si-no-btn');
    const opcionButtons = document.querySelectorAll('.opcion-btn');

    // Navigation between sections
    if (siguienteInicialBtn) {
        siguienteInicialBtn.addEventListener('click', function() {
            inicialQuestionnaireSection.style.display = 'none';
            familyBackgroundSection.style.display = 'block';
        });
    }

    if (atrasFamiliaresBtn) {
        atrasFamiliaresBtn.addEventListener('click', function() {
            familyBackgroundSection.style.display = 'none';
            inicialQuestionnaireSection.style.display = 'block';
        });
    }

    if (siguienteFamiliaresBtn) {
        siguienteFamiliaresBtn.addEventListener('click', function() {
            // Replace 'siguiente_pagina.html' with the actual URL of the next page
            window.location.href = 'siguiente_pagina.html';
        });
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
});