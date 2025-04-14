// header.js

fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // ELEMENTOS
        const profileIcon = document.querySelector('.profile-icon');
        const notificationIcon = document.querySelector('.notification');
        const profileMenu = document.getElementById('profileMenu');
        const notificationMenu = document.getElementById('notificationMenu');
        const notificaciones = document.getElementById('notificaciones');

        // TOGGLE MENÚ PERFIL
        profileIcon?.addEventListener('click', () => {
            const isVisible = !profileMenu.classList.contains('hidden');
            profileMenu.classList.toggle('hidden', isVisible);
            notificationMenu.classList.add('hidden'); // Cierra el otro
        });

        // TOGGLE MENÚ NOTIFICACIONES
        notificationIcon?.addEventListener('click', () => {
            const isVisible = !notificationMenu.classList.contains('hidden');
            notificationMenu.classList.toggle('hidden', isVisible);
            profileMenu.classList.add('hidden'); // Cierra el otro

            // Llenar notificaciones
            const lista = obtenerNotificaciones();
            notificaciones.innerHTML = lista.length
                ? lista.map(n => `<div>${n}</div>`).join("")
                : "<div>No hay notificaciones recientes.</div>";
        });
    });

// Simulación de notificaciones
function obtenerNotificaciones() {
    return [
        '📅 Tienes una sesión con María a las 10:00 AM.',
        '🧠 Recuerda revisar el progreso de Pedro.',
        '📨 Nuevo mensaje de coordinación administrativa.'
    ];
}

function cerrarSesion() {
    window.location.href = 'index.html';
}
