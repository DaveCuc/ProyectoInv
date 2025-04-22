let citas = JSON.parse(localStorage.getItem("citas")) || [];

function renderizarCitas(filtro = "todas") {
  const contenedor = document.getElementById("contenedorCitas");
  contenedor.innerHTML = "";

  const hoy = new Date().setHours(0, 0, 0, 0);
  let citasFiltradas = citas;

  if (filtro === "proximas") {
    citasFiltradas = citas.filter(cita => new Date(cita.fecha).setHours(0, 0, 0, 0) >= hoy);
  } else if (filtro === "pasadas") {
    citasFiltradas = citas.filter(cita => new Date(cita.fecha).setHours(0, 0, 0, 0) < hoy);
  }

  if (citasFiltradas.length === 0) {
    contenedor.innerHTML = "<p>No hay citas registradas.</p>";
    return;
  }

  citasFiltradas.forEach((cita, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-cita";

    const fechaCompleta = new Date(cita.fecha + "T" + cita.hora).toLocaleString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    tarjeta.innerHTML = `
      <div class="encabezado-cita">
        <span>${fechaCompleta} - ${cita.hora}</span>
        ${cita.cancelada ? '<span class="estado-cancelada">CANCELADA</span>' : ''}
      </div>
      <p><strong>Asunto:</strong> ${cita.asunto || "No especificado"}</p>
      <p><strong>Psicólogo:</strong> ${cita.psicologo}</p>
      <p><strong>Primera vez:</strong> ${cita.primeraVez ? "Sí" : "No"}</p>

      <div class="botones-cita">
        <button onclick="editarCita(${index})">Editar</button>
        <button class="btn-cancelar" onclick="cancelarCita(${index})">Cancelar</button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function filtrarCitas(filtro) {
  document.querySelectorAll(".filtro-citas button").forEach(btn => btn.classList.remove("activo"));
  const index = filtro === "todas" ? 0 : filtro === "proximas" ? 1 : 2;
  document.querySelectorAll(".filtro-citas button")[index].classList.add("activo");
  renderizarCitas(filtro);
}

function cancelarCita(index) {
  const confirmacion = confirm("¿Seguro quieres cancelar esta cita?");
  if (confirmacion) {
    const cita = citas[index];
    let ocupadas = JSON.parse(localStorage.getItem('citasOcupadas')) || {};
    if (ocupadas[cita.fecha]) {
      ocupadas[cita.fecha] = ocupadas[cita.fecha].filter(h => h !== cita.hora);
      if (ocupadas[cita.fecha].length === 0) delete ocupadas[cita.fecha];
      localStorage.setItem('citasOcupadas', JSON.stringify(ocupadas));
    }

    citas[index].cancelada = true;
    localStorage.setItem("citas", JSON.stringify(citas));
    renderizarCitas();
  }
}

function editarCita(index) {
  alert("Función de edición aún no implementada.");
}

window.onload = () => renderizarCitas();
