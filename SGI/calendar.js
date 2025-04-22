let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let selectedHour = null;
let turno = 'Matutino';
let primeraVez = null;

let citasOcupadas = JSON.parse(localStorage.getItem("citasOcupadas")) || {};

function loadCalendar() {
  const today = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('calendar-month-year');
  calendar.innerHTML = '';
  monthYear.innerText = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const fechaObj = new Date(currentYear, currentMonth, day);
    const fecha = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const btn = document.createElement('button');
    btn.innerText = day;

    const esPasado = fechaObj < new Date().setHours(0, 0, 0, 0);
    const esFinDeSemana = [0, 6].includes(fechaObj.getDay());
    const horariosOcupados = citasOcupadas[fecha]?.length || 0;
    const estaOcupado = horariosOcupados >= 4;

    if (esPasado || esFinDeSemana) {
      btn.classList.add('pasado');
      btn.disabled = true;
    } else if (estaOcupado) {
      btn.classList.add('ocupado');
      btn.disabled = true;
    }

    btn.onclick = () => {
      selectedDate = fecha;
      document.querySelectorAll('#calendar button').forEach(b => b.classList.remove('seleccionado'));
      btn.classList.add('seleccionado');
      cargarHorarios();
      mostrarDisponibilidad();
    };

    calendar.appendChild(btn);
  }
}

function prevMonth() {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  loadCalendar();
}

function nextMonth() {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  loadCalendar();
}

function selectTurno(t) {
  turno = t;
  document.querySelectorAll('.turno-btns button').forEach(btn => btn.classList.remove('activo'));
  document.querySelectorAll('.turno-btns button').forEach(btn => {
    if (btn.innerText === t) btn.classList.add('activo');
  });
  cargarHorarios();
}

function selectPrimeraVez(value) {
  primeraVez = value;
  document.querySelectorAll('.primera-vez button').forEach(btn => btn.classList.remove('activo'));
  document.querySelectorAll('.primera-vez button')[value ? 0 : 1].classList.add('activo');
}

function cargarHorarios() {
  if (!selectedDate) return;
  const horarios = turno === 'Matutino' ? ["09:00", "10:00", "11:00", "12:00"] : ["14:00", "15:00", "16:00"];
  const container = document.getElementById('horarios');
  container.innerHTML = '';
  horarios.forEach(hora => {
    const btn = document.createElement('button');
    btn.innerText = hora;

    if (citasOcupadas[selectedDate]?.includes(hora)) {
      btn.classList.add('disabled');
      btn.disabled = true;
    }

    btn.onclick = () => {
      selectedHour = hora;
      container.querySelectorAll('button').forEach(b => b.classList.remove('seleccionado'));
      btn.classList.add('seleccionado');
    };

    container.appendChild(btn);
  });
}

function mostrarDisponibilidad() {
  const totalHorarios = turno === 'Matutino' ? 4 : 3;
  const ocupadas = citasOcupadas[selectedDate]?.length || 0;
  const disponibles = Math.max(0, totalHorarios - ocupadas);
  document.getElementById('mensaje').innerText = `Quedan ${disponibles} horario(s) disponible(s)`;
}

function realizarCita() {
  if (!selectedDate || !selectedHour) {
    alert("Selecciona una fecha y hora disponibles");
    return;
  }

  const asunto = document.getElementById("asunto").value || "No especificado";
  const nuevaCita = {
    fecha: selectedDate,
    hora: selectedHour,
    turno: turno,
    asunto: asunto,
    psicologo: "Mtra. Ana Torres",
    primeraVez: primeraVez
  };

  let citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
  citasGuardadas.push(nuevaCita);
  localStorage.setItem('citas', JSON.stringify(citasGuardadas));

  citasOcupadas[selectedDate] = citasOcupadas[selectedDate] || [];
  citasOcupadas[selectedDate].push(selectedHour);
  localStorage.setItem('citasOcupadas', JSON.stringify(citasOcupadas));

  alert(`¡Cita agendada para el ${selectedDate} a las ${selectedHour}!`);
  loadCalendar();
}
loadCalendar();
