document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const tabla = document.querySelector(".tabla-citas");
    const mensaje = document.getElementById("mensaje");
    const alumnoNombre = document.getElementById("alumno-nombre");
    const alumnoControl = document.getElementById("alumno-control");
    const alumnoAsistencias = document.getElementById("alumno-asistencias");
    const alumnoEstatus = document.getElementById("alumno-estatus");
    const alumnoDetailsCard = document.querySelector(".alumno-details-card");

    // === MANEJO DE MENÚ DE PERFIL ===
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

    function toggleElement(element) {
        element.classList.toggle("hidden");
    }

    // === MANEJO DE LA TABLA DE CITAS ===
    if (tabla) {
        tabla.addEventListener("click", (event) => {
            const icono = event.target;
            if (!icono.classList.contains("fa-check") && !icono.classList.contains("fa-times")) return;

            const fila = icono.closest("tr");
            if (!fila) return;

            // ✅ Clic en palomita
            if (icono.classList.contains("fa-check")) {
                document.querySelectorAll(".tabla-citas tbody tr").forEach(tr => tr.classList.remove("fila-activa"));
                fila.classList.add("fila-activa");

                const nombre = fila.dataset.nombre;
                const control = fila.dataset.control;
                const asistencias = fila.dataset.asistencias;
                const estatus = fila.dataset.estatus;

                alumnoNombre.textContent = nombre;
                alumnoControl.textContent = control;
                alumnoAsistencias.textContent = asistencias;
                alumnoEstatus.textContent = estatus;

                if (alumnoDetailsCard) alumnoDetailsCard.style.display = "block";

                mensaje.textContent = "Asistencia registrada correctamente.";
                setTimeout(() => mensaje.textContent = "", 2000);
            }

            // ❌ Clic en equis
            if (icono.classList.contains("fa-times")) {
                const nombreActual = alumnoNombre.textContent;
                if (fila.dataset.nombre === nombreActual) {
                    alumnoNombre.textContent = "Nombre Alumno";
                    alumnoControl.textContent = "-";
                    alumnoAsistencias.textContent = "-";
                    alumnoEstatus.textContent = "-";
                }

                fila.remove();
                mensaje.textContent = "Cita eliminada.";
                setTimeout(() => mensaje.textContent = "", 2000);
            }
        });
    }
});
