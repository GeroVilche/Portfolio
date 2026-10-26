// CAJA DE EMAIL: botón "Copiar"

const inputEmail = document.getElementById('emailContacto');
const botonCopiar = document.getElementById('botonCopiar');
const textoCopiar = document.getElementById('textoCopiar');
const avisoCopiado = document.getElementById('avisoCopiado');
const MILISEGUNDOS_CONFIRMACION = 2000;

let temporizador = null;

// Al tocar el input, selecciono todo el mail (así también se puede copiar a mano)
inputEmail.addEventListener('focus', () => inputEmail.select());

botonCopiar.addEventListener('click', async () => {
    try {
        // navigator.clipboard es la forma moderna de copiar. Ojo: solo funciona en páginas
        // seguras (https o localhost). En GitHub Pages es https, así que anda.
        await navigator.clipboard.writeText(inputEmail.value);
        mostrarCopiado();
    } catch (error) {
        // Si el navegador no deja copiar, selecciono el texto para que lo copien con Ctrl+C
        inputEmail.focus();
        avisoCopiado.textContent = 'No pude copiarlo automáticamente: ya está seleccionado, copialo con Ctrl+C.';
    }
});

// El botón muestra "¡Copiado!" un par de segundos y vuelve a "Copiar".
// clearTimeout: si tocan varias veces seguidas, reinicio la cuenta en vez de acumular temporizadores.
function mostrarCopiado() {
    textoCopiar.textContent = '¡Copiado!';
    botonCopiar.classList.add('email-caja__boton--ok');
    avisoCopiado.textContent = 'Email copiado al portapapeles.';

    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        textoCopiar.textContent = 'Copiar';
        botonCopiar.classList.remove('email-caja__boton--ok');
        avisoCopiado.textContent = '';
    }, MILISEGUNDOS_CONFIRMACION);
}
