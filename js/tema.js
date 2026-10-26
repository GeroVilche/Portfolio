// TEMA OSCURO / CLARO
// El tema inicial ya lo puso el script del <head> (lo guardado, o si no, el del sistema).
// Acá solo manejo el botón: cambiar de tema, recordarlo y mantener actualizado el aria-label.

const botonTema = document.getElementById('botonTema');

// El aria-label dice lo que VA A PASAR al tocar el botón (para lectores de pantalla)
function actualizarEtiquetaBoton() {
    const temaActual = document.documentElement.dataset.tema;
    botonTema.setAttribute('aria-label', temaActual === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

botonTema.addEventListener('click', () => {
    const nuevoTema = document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.dataset.tema = nuevoTema;

    // Lo guardo para la próxima visita. Ojo: localStorage puede tirar error (modo privado,
    // almacenamiento bloqueado). Si pasa, el tema cambia igual; solo no se recuerda.
    try {
        localStorage.setItem('tema', nuevoTema);
    } catch (error) {
        // no pasa nada: es solo una comodidad
    }

    actualizarEtiquetaBoton();
});

// Si el visitante nunca eligió un tema y cambia el de su sistema con la página abierta
// (ej. el celu pasa a modo oscuro de noche), la sigo. Si ya eligió con el botón, respeto su elección.
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (evento) => {
    let temaGuardado = null;
    try {
        temaGuardado = localStorage.getItem('tema');
    } catch (error) {}

    if (temaGuardado) return;

    document.documentElement.dataset.tema = evento.matches ? 'claro' : 'oscuro';
    actualizarEtiquetaBoton();
});

actualizarEtiquetaBoton();
