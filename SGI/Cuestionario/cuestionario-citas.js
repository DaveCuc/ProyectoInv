document.addEventListener("DOMContentLoaded", function () {
    // === NAVEGACIÓN ENTRE FORMULARIOS ===
    const formularios = document.querySelectorAll(".formulario-card");
    let formularioActual = 0;

    function mostrarFormulario(index) {
        formularios.forEach((formulario, i) => {
            formulario.style.display = i === index ? "block" : "none";
        });

        // Actualizar botones paso
        document.querySelectorAll(".paso-btn").forEach((btn, i) => {
            btn.classList.toggle("activo", i === index);
        });

        // Actualizar texto del botón siguiente
        const btnSiguiente = document.getElementById("btn-siguiente");
        btnSiguiente.textContent = (index === formularios.length - 1) ? "Finalizar" : "Siguiente";

        // Deshabilitar botón anterior si es el primero
        document.getElementById("btn-anterior").disabled = index === 0;
    }

    mostrarFormulario(formularioActual);

    // Botones de navegación principal
    document.getElementById("btn-anterior").addEventListener("click", () => {
        if (formularioActual > 0) {
            formularioActual--;
            mostrarFormulario(formularioActual);
        }
    });

    document.getElementById("btn-siguiente").addEventListener("click", () => {
        if (formularioActual < formularios.length - 1) {
            formularioActual++;
            mostrarFormulario(formularioActual);
        } else {
            alert("Cuestionario completado. Puedes guardar los datos ahora.");
        }
    });

    // Botones numerados (1, 2, 3, 4)
    document.querySelectorAll(".paso-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            formularioActual = parseInt(btn.dataset.step);
            mostrarFormulario(formularioActual);
        });
    });

    // === SELECCIÓN DE MOTIVOS DE CONSULTA (múltiple) ===
    const motivoButtons = document.querySelectorAll(".btn-gris[data-motivo]");
    const otrosEspecificar = document.getElementById("otros-especificar");
    const otrosButton = document.querySelector(".btn-gris[data-motivo='otros']");

    motivoButtons.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("selected");
            if (button === otrosButton && otrosEspecificar) {
                otrosEspecificar.disabled = !this.classList.contains("selected");
            }
        });
    });

    // === BOTONES SÍ/NO (selección única por grupo) ===
    const siNoButtons = document.querySelectorAll('.btn-gris[data-option]');
    siNoButtons.forEach(button => {
        button.addEventListener('click', function () {
            const optionGroup = this.closest('.si-no-group');
            if (optionGroup) {
                optionGroup.querySelectorAll('.btn-gris').forEach(btn => btn.classList.remove('selected'));
            }
            this.classList.add('selected');
        });
    });

    // === BOTONES DE OPCIÓN ÚNICA (tipo radio por sección) ===
    const opcionButtons = document.querySelectorAll('.btn-gris[data-opcion]');
    opcionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const optionGroup = this.closest('.opcion-seleccion');
            if (optionGroup) {
                optionGroup.querySelectorAll('.btn-gris').forEach(btn => btn.classList.remove('selected'));
            }
            this.classList.add('selected');
        });
    });
});
