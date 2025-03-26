document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const citaTable = document.querySelector(".cita-list-table table tbody");
    const alumnoNombre = document.getElementById("alumno-nombre");
    const alumnoControl = document.getElementById("alumno-control");
    const alumnoAsistencias = document.getElementById("alumno-asistencias");
    const alumnoEstatus = document.getElementById("alumno-estatus");
    const alumnoDetailsCard = document.querySelector(".alumno-details-card");

    // Evento para abrir/cerrar el menú de perfil
    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            toggleElement(profileMenu);
            event.stopPropagation(); // Evita que el clic se propague al documento
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

    // Function to handle row clicks and display student details
    if (citaTable && alumnoDetailsCard) {
        citaTable.addEventListener("click", function (event) {
            const row = event.target.closest("tr");
            if (row) {
                const nombre = row.querySelector("td:nth-child(2)").textContent;
                alumnoNombre.textContent = nombre;
                alumnoControl.textContent = "EjemploControl"; // Replace with actual data
                alumnoAsistencias.textContent = "5"; // Replace with actual data
                alumnoEstatus.textContent = "Activo"; // Replace with actual data
                alumnoDetailsCard.style.display = "block"; // Show the details card
            }
        });
    } else if (alumnoDetailsCard) {
        alumnoDetailsCard.style.display = "none"; // Hide details card initially if no table
    }
});