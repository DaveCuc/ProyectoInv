document.addEventListener("DOMContentLoaded", () => {
    // === ELEMENTOS DEL DOM QUE EL JS CONTROLARÁ ===
    const profileIcon = document.getElementById("profile-icon");            // Icono de perfil (header)
    const profileMenu = document.getElementById("profile-menu");            // Menú flotante con opciones del perfil
    const tabla = document.querySelector(".tabla-citas");                   // Tabla que contiene las citas agendadas
    const mensaje = document.getElementById("mensaje");                      // Contenedor para mensajes temporales
  
    // Tarjeta lateral: muestra datos del alumno seleccionado
    const alumnoNombre = document.getElementById("alumno-nombre");
    const alumnoControl = document.getElementById("alumno-control");
    const alumnoAsistencias = document.getElementById("alumno-asistencias");
    const alumnoEstatus = document.getElementById("alumno-estatus");
    const alumnoDetailsCard = document.querySelector(".alumno-details-card");
  
    // === MANEJO DEL MENÚ DE PERFIL (abrir/cerrar flotante) ===
    if (profileIcon) {
      profileIcon.addEventListener("click", function (event) {
        toggleElement(profileMenu);      // Abre o cierra el panel de perfil
        event.stopPropagation();         // Previene que se cierre al hacer clic dentro
      });
    }
  
    // Oculta el menú al hacer clic fuera de él
    document.addEventListener("click", function () {
      if (profileMenu) profileMenu.classList.add("hidden");
    });
  
    // Previene que clic dentro del menú lo cierre
    if (profileMenu) {
      profileMenu.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }
  
    // Función reutilizable para ocultar/mostrar cualquier elemento
    function toggleElement(element) {
      element.classList.toggle("hidden");
    }
  
    // === MANEJO PRINCIPAL DE LA TABLA DE CITAS ===
    if (tabla) {
      tabla.addEventListener("click", (event) => {
        const icono = event.target;
  
        // Salir si no se hace clic sobre los íconos de asistencia
        if (!icono.classList.contains("fa-check") && !icono.classList.contains("fa-times")) return;
  
        const fila = icono.closest("tr");
        if (!fila) return;
  
        // ✅ === MARCAR ASISTENCIA ===
        if (icono.classList.contains("fa-check")) {
          // Limpia cualquier fila previamente seleccionada
          document.querySelectorAll(".tabla-citas tbody tr").forEach(tr => tr.classList.remove("fila-activa"));
  
          // Marca la fila actual como activa
          fila.classList.add("fila-activa");
  
          // Extrae los datos del alumno desde los atributos HTML
          const nombre = fila.dataset.nombre;
          const control = fila.dataset.control;
          const asistencias = fila.dataset.asistencias;
          const estatus = fila.dataset.estatus;
  
          // Inserta los datos del alumno en la tarjeta lateral
          alumnoNombre.textContent = nombre;
          alumnoControl.textContent = control;
          alumnoAsistencias.textContent = asistencias;
          alumnoEstatus.textContent = estatus;
  
          // Muestra la tarjeta si estaba oculta
          if (alumnoDetailsCard) alumnoDetailsCard.style.display = "block";
  
          // 🔗 BACKEND: Aquí se debe llamar un endpoint como:
          // POST /api/asistencia
          // Body: { alumno_id: control, estado: "asistencia", cita_id: ID (si está disponible) }
  
          // Mensaje de éxito
          mensaje.textContent = "Asistencia registrada correctamente.";
          setTimeout(() => mensaje.textContent = "", 2000);
        }
  
        // ❌ === MARCAR FALTA / ELIMINAR CITA ===
        if (icono.classList.contains("fa-times")) {
          // Si el alumno mostrado es el mismo que se va a eliminar, limpiar tarjeta lateral
          const nombreActual = alumnoNombre.textContent;
          if (fila.dataset.nombre === nombreActual) {
            alumnoNombre.textContent = "Nombre Alumno";
            alumnoControl.textContent = "-";
            alumnoAsistencias.textContent = "-";
            alumnoEstatus.textContent = "-";
          }
  
          // Elimina la fila visualmente de la tabla
          fila.remove();
  
          // 🔗 BACKEND: Aquí también se puede hacer una petición a:
          // DELETE /api/citas/{id}
          // o
          // POST /api/asistencia { alumno_id: control, estado: "falta", cita_id: ID }
  
          // Mensaje informativo
          mensaje.textContent = "Cita eliminada.";
          setTimeout(() => mensaje.textContent = "", 2000);
        }
      });
    }
  });
  