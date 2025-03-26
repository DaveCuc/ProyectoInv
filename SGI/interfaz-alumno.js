document.addEventListener('DOMContentLoaded', function() {
    // Obtener información de localStorage
    const numControl = localStorage.getItem('numControl');
    const nombre = localStorage.getItem('nombre');
    const apellidos = localStorage.getItem('apellidos');

    // Mostrar información en la página
    if (numControl) {
        document.querySelector('.welcome-section p:nth-child(2)').textContent += ': ' + numControl;
    }
    if (nombre && apellidos) {
        document.querySelector('.welcome-section p:nth-child(3)').textContent += ': ' + nombre + ' ' + apellidos;
    }

    // Manejo del menú desplegable del usuario
    document.querySelector('.user-dropdown').addEventListener('click', function() {
        this.querySelector('.dropdown-content').style.display = 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-dropdown')) {
            document.querySelector('.dropdown-content').style.display = 'none';
        }
    });

    // Animación del botón
    const infoButton = document.querySelector('.info-button');

    infoButton.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });

    infoButton.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });

    // Redirigir a formularios
    document.querySelector('.info-button').addEventListener('click', function() {
        window.location.href = 'formularios.html'; // Asegúrate de que este sea el nombre correcto de tu archivo
    });
});