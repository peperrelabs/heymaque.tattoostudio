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
    const randomIndices = getRandomImageIndices(totalImagesInFolder, imagesToShow);

    randomIndices.forEach(index => {
        // Change from LI to DIV for Swiper Slide
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const img = document.createElement('img');

        // --- OPCIÓN A: TUS FOTOS REALES (Descomenta esto cuando tengas la carpeta lista) ---
        img.src = `${imageFolder}${index}${imageExtension}`;
        img.alt = `Tatuaje trabajo ${index}`;

        // A: CLIC PARA ABRIR LIGHTBOX
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            // Swiper handles drag vs click well, but we can verify if needed
            openLightbox(img.src);
        });

        slide.appendChild(img);
        track.appendChild(slide);
    });

    // --- INITIALIZE SWIPER ---
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
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