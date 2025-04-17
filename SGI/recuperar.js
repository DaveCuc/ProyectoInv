document.addEventListener('DOMContentLoaded', () => {
    const formUsuario = document.getElementById('form-usuario');
    const formCorreo = document.getElementById('form-correo');
    const formCodigo = document.getElementById('form-codigo');
  
    const inputUsuario = document.getElementById('usuario');
    const inputCorreo = document.getElementById('correo');
    const inputCodigo = document.getElementById('codigo');
    const inputNuevaContrasena = document.getElementById('nueva-contrasena');
  
    const temporizador = document.getElementById('temporizador');
  
    let codigoGenerado = '';
    let cuentaRegresiva;
    let tiempoLimite = 120; // segundos
  
    // Etapa 1: Verificar usuario
    formUsuario.addEventListener('submit', (e) => {
      e.preventDefault();
      const usuario = inputUsuario.value.trim();
      if (usuario === '') return alert('Ingresa un nombre de usuario.');
  
      // Simula validación
      formUsuario.classList.add('hidden');
      formCorreo.classList.remove('hidden');
    });
  
    // Etapa 2: Verificar correo y enviar código
    formCorreo.addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = inputCorreo.value.trim();
      if (!correo.includes('@')) return alert('Correo inválido.');
  
      codigoGenerado = generarCodigo();
      alert(`Código enviado a ${correo} (simulado): ${codigoGenerado}`);
  
      formCorreo.classList.add('hidden');
      formCodigo.classList.remove('hidden');
      iniciarTemporizador();
    });
  
    // Etapa 3: Verificar código y cambiar contraseña
    formCodigo.addEventListener('submit', (e) => {
      e.preventDefault();
      const codigoIngresado = inputCodigo.value.trim();
      const nuevaPass = inputNuevaContrasena.value.trim();
  
      if (codigoIngresado !== codigoGenerado) {
        return alert('Código incorrecto.');
      }
  
      if (nuevaPass.length < 6) {
        return alert('La contraseña debe tener al menos 6 caracteres.');
      }
  
      clearInterval(cuentaRegresiva);
      alert('Contraseña restablecida con éxito.');
      window.location.href = 'index.html';
    });
  
    // Código aleatorio
    function generarCodigo() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  
    // Temporizador
    function iniciarTemporizador() {
      let tiempo = tiempoLimite;
      actualizarTemporizador(tiempo);
  
      cuentaRegresiva = setInterval(() => {
        tiempo--;
        actualizarTemporizador(tiempo);
  
        if (tiempo <= 0) {
          clearInterval(cuentaRegresiva);
          temporizador.textContent = 'El código ha expirado. Vuelve a intentarlo.';
          inputCodigo.disabled = true;
          inputNuevaContrasena.disabled = true;
        }
      }, 1000);
    }
  
    function actualizarTemporizador(tiempo) {
      const minutos = Math.floor(tiempo / 60).toString().padStart(2, '0');
      const segundos = (tiempo % 60).toString().padStart(2, '0');
      temporizador.textContent = `⏳ Tiempo restante: ${minutos}:${segundos}`;
    }
  });
  