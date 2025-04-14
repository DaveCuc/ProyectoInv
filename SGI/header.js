// header.js

// Cargar el header.html dinámicamente
fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Activar funcionalidad del menú
        const profileIcon = document.querySelector('.profile-icon');
        const profileMenu = document.getElementById('profileMenu');

        profileIcon?.addEventListener('click', () => {
            profileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function (event) {
            if (!profileMenu.contains(event.target) && !profileIcon.contains(event.target)) {
                profileMenu.classList.add('hidden');
            }
        });
    });

// Redirigir a index.html al cerrar sesión
