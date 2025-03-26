document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.getElementById("notification-icon");
    const profileIcon = document.getElementById("profile-icon");
    const notificationPanel = document.getElementById("notification-panel");
    const profileMenu = document.getElementById("profile-menu");
    const profileNameElement = document.getElementById("profile-name");

    // Función para mostrar/ocultar un elemento
    function toggleElement(element) {
        element.classList.toggle("hidden");
    }

    // Evento para abrir/cerrar el panel de notificaciones
    notificationIcon.addEventListener("click", function (event) {
        toggleElement(notificationPanel);
        profileMenu.classList.add("hidden"); // Oculta el menú de perfil si está abierto
        event.stopPropagation(); // Evita que el clic se propague al documento
    });

    // Evento para abrir/cerrar el menú de perfil
    profileIcon.addEventListener("click", function (event) {
        toggleElement(profileMenu);
        notificationPanel.classList.add("hidden"); // Oculta el panel de notificaciones si está abierto
        event.stopPropagation(); // Evita que el clic se propague al documento
    });

    // Evento para cerrar los menús al hacer clic fuera de ellos
    document.addEventListener("click", function () {
        notificationPanel.classList.add("hidden");
        profileMenu.classList.add("hidden");
    });

    // Evitar que los clics dentro de los menús cierren los mismos
    notificationPanel.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    profileMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Agregar funcionalidad a los botones principales (solo alertas de ejemplo)
    document.getElementById("btn-citas").addEventListener("click", function () {
        alert("Redirigiendo a Citas...");
        // Aquí podrías redirigir a la página de citas: window.location.href = 'citas.html';
    });

    document.getElementById("btn-alumnos").addEventListener("click", function () {
        alert("Redirigiendo a Alumnos...");
        // Aquí podrías redirigir a la página de alumnos: window.location.href = 'alumnos.html';
    });

    document.getElementById("btn-estadisticas").addEventListener("click", function () {
        alert("Redirigiendo a Estadísticas...");
        // Aquí podrías redirigir a la página de estadísticas: window.location.href = 'estadisticas.html';
    });

    // Ejemplo para actualizar el nombre del psicólogo (puedes obtenerlo dinámicamente)
    profileNameElement.textContent = 'Nombre del Psicólogo'; // Reemplaza con el nombre real
});