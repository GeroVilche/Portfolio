// ANIMACIONES AL SCROLLEAR + AÑO DEL FOOTER

// Le aviso al CSS que hay JavaScript: recién ahí las secciones .revelar arrancan escondidas.
// Si este archivo no carga, la clase no está y todo se ve normal (nada queda invisible).
document.documentElement.classList.add('js');

// SECCIONES QUE APARECEN AL ENTRAR EN PANTALLA
// IntersectionObserver me avisa cuando un elemento entra en la vista, sin tener que
// escuchar el scroll a cada rato (que es más pesado).
// threshold: 0.12 -> aviso cuando se ve al menos el 12% de la sección.
const secciones = document.querySelectorAll('.revelar');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        entrada.target.classList.add('revelar--visible');
        // Ya apareció: dejo de observarla, así no se vuelve a animar cada vez que paso
        observador.unobserve(entrada.target);
    });
}, { threshold: 0.12 });

secciones.forEach((seccion) => observador.observe(seccion));

// AÑO DEL FOOTER: lo calculo para no tener que acordarme de cambiarlo cada enero
document.getElementById('anio').textContent = new Date().getFullYear();
