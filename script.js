function mostrarFormulario(seccion) {
    document.getElementById('formGenerales').classList.toggle('hidden', seccion !== 'generales');
    document.getElementById('formFamiliares').classList.toggle('hidden', seccion !== 'familiares');

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="mostrarFormulario('${seccion}')"]`).classList.add('active');
}
