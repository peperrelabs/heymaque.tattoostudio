document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN DE LA GALERÍA ---
    const totalImagesInFolder = 17; // CAMBIA ESTO: Número total de fotos que tienes en la carpeta 'img'
    const imagesToShow = 10;        // Cuántas queremos mostrar
    const imageFolder = 'img/';     // Ruta de la carpeta
    const imageExtension = '.jpg';  // Extensión de tus archivos (asegúrate que sean todas iguales)

    const track = document.getElementById('dynamic-gallery');

    // 1. Función para obtener números aleatorios únicos
    function getRandomImageIndices(total, count) {
        const indices = [];
        while (indices.length < count) {
            const r = Math.floor(Math.random() * total) + 1;
            if (indices.indexOf(r) === -1) indices.push(r);
        }
        return indices;
    }

    // 2. Generar el HTML de las imágenes
    // NOTA: Para probarlo ahora mismo sin tus fotos, usaré unsplash. 
    // Cuando pongas tus fotos, descomenta la linea "SRC REAL" y comenta la de UNSPLASH.

    const randomIndices = getRandomImageIndices(totalImagesInFolder, imagesToShow);

    randomIndices.forEach(index => {
        const li = document.createElement('li');
        li.classList.add('carousel-slide');

        const img = document.createElement('img');

        // --- OPCIÓN A: TUS FOTOS REALES (Descomenta esto cuando tengas la carpeta lista) ---
        img.src = `${imageFolder}${index}${imageExtension}`;
        img.alt = `Tatuaje trabajo ${index}`;

        // A: CLIC PARA ABRIR LIGHTBOX
        // A: CLIC PARA ABRIR LIGHTBOX
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault(); // Evitar abrir si se estaba arrastrando
                return;
            }
            openLightbox(img.src);
        });
        // Evitar comportamiento de arrastre nativo de la imagen
        img.addEventListener('dragstart', (e) => e.preventDefault());

        li.appendChild(img);
        track.appendChild(li);
    });

    // --- LÓGICA DEL CARRUSEL ---
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let scrollAmount = 0;

    nextBtn.addEventListener('click', () => {
        const slideWidth = document.querySelector('.carousel-slide').offsetWidth + 20; // ancho + margen
        const trackWidth = track.scrollWidth;
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;

        scrollAmount += slideWidth;
        if (scrollAmount > trackWidth - containerWidth) {
            scrollAmount = 0; // Volver al principio si llegamos al final
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', () => {
        const slideWidth = document.querySelector('.carousel-slide').offsetWidth + 20;

        scrollAmount -= slideWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // --- LÓGICA DE ARRASTRE (SWIPE) ---
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false; // Para diferenciar clic de arrastre

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = scrollAmount; // Usamos la variable scrollAmount global
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
        // Ajustar al slide más cercano (opcional, o dejar libre)
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad del scroll
        isDragging = true;

        // Actualizamos scrollAmount pero validando límites
        let newScroll = scrollLeft - walk;
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const trackWidth = track.scrollWidth;

        if (newScroll < 0) newScroll = 0;
        if (newScroll > trackWidth - containerWidth) newScroll = trackWidth - containerWidth;

        scrollAmount = newScroll;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // TOUCH EVENTS (Móvil)
    track.addEventListener('touchstart', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = scrollAmount;
    });

    track.addEventListener('touchend', () => {
        isDown = false;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        isDragging = true;

        let newScroll = scrollLeft - walk;
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        const trackWidth = track.scrollWidth;

        if (newScroll < 0) newScroll = 0;
        if (newScroll > trackWidth - containerWidth) newScroll = trackWidth - containerWidth;

        scrollAmount = newScroll;
        track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    // Menú Hamburguesa simple para móvil (Lógica Antigua eliminada)

    // --- EFECTO NAVBAR STICKY ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Si bajamos más de 100px (aprox llegando a artistas o dejando hero)
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});



// Función Global para el menú
function toggleMenu() {
    const menu = document.getElementById('navbar-menu');
    menu.classList.toggle('active');
}

// --- LÓGICA LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

function openLightbox(src) {
    lightbox.style.display = "flex"; // Usamos flex para centrar fácil
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightboxImg.src = src;
}

// Cerrar con el botón
closeBtn.onclick = function () {
    lightbox.style.display = "none";
}

// Cerrar clicando fuera de la imagen
lightbox.onclick = function (e) {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
}