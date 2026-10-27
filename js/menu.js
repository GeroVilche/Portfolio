// MENÚ HAMBURGUESA (celu)
// Solo pongo o saco la clase .header--menu-abierto en el header: todo lo visual (mostrar el panel,
// convertir las rayitas en X) lo hace el CSS. Mismo sistema que en el lavadero.

const header = document.getElementById('header');
const botonMenu = document.getElementById('botonMenu');
const menu = document.getElementById('menuPrincipal');

function abrirMenu(abrir) {
    header.classList.toggle('header--menu-abierto', abrir);
    // aria-expanded y aria-label avisan el estado a los lectores de pantalla
    botonMenu.setAttribute('aria-expanded', String(abrir));
    botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}

botonMenu.addEventListener('click', () => {
    abrirMenu(!header.classList.contains('header--menu-abierto'));
});

// Al tocar un link, cierro el menú (el link igual lleva a su sección)
menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => abrirMenu(false));
});

// Escape cierra el menú y devuelve el foco al botón (para quien navega con teclado)
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && header.classList.contains('header--menu-abierto')) {
        abrirMenu(false);
        botonMenu.focus();
    }
});

// Si agrandan la ventana con el menú abierto (ej. giran la tablet), lo cierro: en pantalla grande
// el menú se ve en línea y la clase quedaría puesta sin sentido. 720px = el mismo corte del CSS.
window.matchMedia('(min-width: 720px)').addEventListener('change', (evento) => {
    if (evento.matches) abrirMenu(false);
});
