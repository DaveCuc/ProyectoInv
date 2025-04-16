document.addEventListener("DOMContentLoaded", function () {
    // === ELEMENTOS DE LA INTERFAZ ===
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const motivoButtons = document.querySelectorAll(".motivo-btn");
    const otrosEspecificar = document.getElementById("otros-especificar");

    // === MANEJO DEL MENÚ DE PERFIL (abrir/cerrar) ===
    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            toggleElement(profileMenu);
            event.stopPropagation();
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

    // Mostrar u ocultar paneles flotantes
    function toggleElement(element) {
        element.classList.toggle("hidden");
    }

    // === MANEJO DE SELECCIÓN DE MOTIVOS ===
    // Los botones representan un motivo de consulta (ansiedad, depresión, etc.)
    // Backend debe recibir los valores seleccionados al guardar el cuestionario
    motivoButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("selected");  // Permite múltiples selecciones
        });
    });

    // === HABILITAR / DESHABILITAR CAMPO DE "OTROS" ===
    // Si se selecciona "otros", se activa el campo textarea para escribir
    const otrosButton = document.querySelector(".motivo-btn[data-motivo='otros']");
    if (otrosButton && otrosEspecificar) {
        otrosEspecificar.disabled = !otrosButton.classList.contains("selected");
        otrosButton.addEventListener("click", function() {
            otrosEspecificar.disabled = !this.classList.contains("selected");
        });
    }

    // === FUNCIÓN PARA POBLAR LOS DATOS DEL ALUMNO ===
    // El backend debe enviar estos datos al llegar a esta vista (vía URL, sessionStorage o API)
    // Esta función se puede invocar con los valores obtenidos para mostrar el alumno correcto
    function populateStudentInfo(nombre, numControl, carrera, semestre, edad, asistencias) {
        document.getElementById("info-nombre-alumno").textContent = nombre;
        document.getElementById("info-num-control").textContent = numControl;
        document.getElementById("info-carrera").textContent = carrera;
        document.getElementById("info-semestre").textContent = semestre;
        document.getElementById("info-edad").textContent = edad;
        document.getElementById("info-asistencias").textContent = asistencias;
    }

    // Ejemplo de uso (el backend o frontend debe llamar esto con los datos del alumno)
    // populateStudentInfo("Juan Pérez", "123456", "Ingeniería", "5to", "20", "3");
});


// === SEGUNDA CARGA PARA SECCIONES AVANZADAS (si aplica en cuestionario dividido) ===
document.addEventListener('DOMContentLoaded', function() {
    // BOTONES DE NAVEGACIÓN ENTRE SECCIONES
    const siguienteInicialBtn = document.getElementById('siguiente-inicial');     // Avanzar a antecedentes familiares
    const atrasFamiliaresBtn = document.getElementById('atras-familiares');       // Volver a motivos
    const siguienteFamiliaresBtn = document.getElementById('siguiente-familiares'); // Ir a la siguiente sección

    const inicialQuestionnaireSection = document.getElementById('initial-questionnaire');
    const familyBackgroundSection = document.getElementById('family-background');

    // === NAVEGACIÓN ENTRE SECCIONES DEL FORMULARIO ===
    // Cambia visibilidad entre bloques de preguntas
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

    // 🚀 Aquí puedes insertar un envío al backend antes de redireccionar
    if (siguienteFamiliaresBtn) {
        siguienteFamiliaresBtn.addEventListener('click', function() {
            // 🔗 Reemplazar con la ruta real a guardar datos antes de continuar
            // Ejemplo: POST /api/cuestionario/familiares
            // Después: redirigir a próxima sección
            window.location.href = 'siguiente_pagina.html';
        });
    }

    // === BOTONES SÍ/NO: Selección binaria por grupo ===
    // Se usa para preguntas tipo "¿Tuvo problemas de conducta?"
    const siNoButtons = document.querySelectorAll('.si-no-btn');
    siNoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.si-no-group');
            optionGroup.querySelectorAll('.si-no-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // === BOTONES OPCIÓN ÚNICA (tipo radio) ===
    // Se usa para preguntas tipo "¿Cuál es tu nivel de energía?"
    const opcionButtons = document.querySelectorAll('.opcion-btn');
    opcionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionGroup = this.closest('.opcion-seleccion');
            optionGroup.querySelectorAll('.opcion-btn').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});
