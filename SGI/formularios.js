function mostrarFormulario(formulario) {
    document.querySelectorAll('.form-section').forEach(form => form.classList.add('hidden'));
    document.getElementById('form' + formulario.charAt(0).toUpperCase() + formulario.slice(1)).classList.remove('hidden');

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.tab[onclick="mostrarFormulario('${formulario}')"]`).classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    // Menú perfil (si existiera)
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        userInfo.addEventListener('click', function () {
            this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'flex' ? 'none' : 'flex';
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.user-info')) {
                document.querySelector('.dropdown').style.display = 'none';
            }
        });
    }

    // Animación de la foto de perfil
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        profilePhoto.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Botón atrás (selección segura por clase)
    const btnAtras = document.querySelector('.btn-azul:first-of-type');
    if (btnAtras) {
        btnAtras.addEventListener('click', function () {
            window.location.href = 'interfaz-alumno.html';
        });
    }

    // Botón guardar
    const btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', function () {
        const nombre = document.getElementById('nombre')?.value;
        const apellidoP = document.getElementById('apellidoP')?.value;
        const apellidoM = document.getElementById('apellidoM')?.value;
        const numControl = document.getElementById('numControl')?.value;

        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellidoP', apellidoP);
        localStorage.setItem('apellidoM', apellidoM);
        localStorage.setItem('numControl', numControl);

        window.location.href = 'interfaz-alumno2.html';
    });

    // Campos dinámicos para hermanos
    const numHermanosInput = document.getElementById('numHermanos');
    const contenedorHermanos = document.getElementById('contenedorHermanos');

    numHermanosInput.addEventListener('input', function () {
        let num = parseInt(this.value);
        if (isNaN(num) || num < 0) {
            this.value = 0;
            num = 0;
        }

        contenedorHermanos.innerHTML = ''; // Limpiar contenido
        for (let i = 0; i < num; i++) {
            const div = document.createElement('div');
            div.className = 'form-row';
            div.innerHTML = `
                <div class="input-group">
                    <input type="text" placeholder="Nombre del hermano ${i + 1}">
                </div>
                <div class="input-group">
                    <input type="number" placeholder="Edad" min="0" value="0">
                </div>
                <div class="input-group">
                    <input type="text" placeholder="Escolaridad">
                </div>
                <div class="input-group">
                    <input type="text" placeholder="Relación">
                </div>
            `;
            contenedorHermanos.appendChild(div);
        }
    });
});
