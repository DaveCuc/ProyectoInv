function mostrarFormulario(formulario) {
    document.querySelectorAll('.form-section').forEach(form => form.classList.add('hidden'));
    document.getElementById('form' + formulario.charAt(0).toUpperCase() + formulario.slice(1)).classList.remove('hidden');

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab[onclick="mostrarFormulario('${formulario}')"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.user-info').addEventListener('click', function() {
        this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-info')) {
            document.querySelector('.dropdown').style.display = 'none';
        }
    });

    // Animación de la foto de perfil
    const profilePhoto = document.querySelector('.profile-photo');

    profilePhoto.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });

    profilePhoto.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });

    // Regresar a interfaz-alumno.html
    document.querySelector('.btn:first-child').addEventListener('click', function() {
        window.location.href = 'interfaz-alumno.html';
    });

    // Guardar información y redirigir
    const btnGuardar = document.getElementById('btnGuardar');

    btnGuardar.addEventListener('click', function() {
        // Obtener información del formulario
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const numControl = document.getElementById('numControl').value;

        // Guardar información en localStorage
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellidos', apellidos);
        localStorage.setItem('numControl', numControl);

        // Redirigir a la página de agendar cita y consultar cita
        window.location.href = 'interfaz-alumno2.html'; // Asegúrate de que este sea el nombre correcto de tu archivo
    });
});