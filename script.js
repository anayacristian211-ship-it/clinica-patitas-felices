/* =================================
   PATITAS FELICES - JAVASCRIPT
================================= */

// AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
document.getElementById("anio").textContent =
    new Date().getFullYear();


// =================================
// MENÚ DE NAVEGACIÓN PARA CELULARES
// =================================

const menuToggle = document.getElementById("menuToggle");
const navegacion = document.getElementById("navegacion");

menuToggle.addEventListener("click", function () {
    const estaAbierto = navegacion.classList.toggle("abierto");

    menuToggle.setAttribute("aria-expanded", estaAbierto);
    menuToggle.setAttribute(
        "aria-label",
        estaAbierto ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.textContent = estaAbierto ? "✕" : "☰";
});

// Cerrar el menú al seleccionar una sección
navegacion.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        navegacion.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});


// =================================
// GALERÍA Y VENTANA MODAL LIGHTBOX
// =================================

const fotos = Array.from(
    document.querySelectorAll(".foto-galeria")
);

const lightbox = document.getElementById("lightbox");
const imagenAmpliada = document.getElementById("imagenAmpliada");
const textoImagen = document.getElementById("textoImagen");

const cerrarLightbox = document.getElementById("cerrarLightbox");
const anteriorLightbox = document.getElementById("anteriorLightbox");
const siguienteLightbox = document.getElementById("siguienteLightbox");

let indiceActual = 0;
let elementoAnterior = null;

// Mostrar una imagen ampliada
function mostrarImagen(indice) {
    indiceActual = (indice + fotos.length) % fotos.length;

    const imagenOriginal = fotos[indiceActual].querySelector("img");

    imagenAmpliada.src = imagenOriginal.src;
    imagenAmpliada.alt = imagenOriginal.alt;
    textoImagen.textContent =
        imagenOriginal.alt + " (" + (indiceActual + 1) +
        " de " + fotos.length + ")";

    anteriorLightbox.disabled = fotos.length < 2;
    siguienteLightbox.disabled = fotos.length < 2;
}

// Abrir la ventana modal
function abrirLightbox(indice) {
    elementoAnterior = document.activeElement;

    mostrarImagen(indice);

    lightbox.classList.add("activo");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    cerrarLightbox.focus();
}

// Cerrar la ventana modal
function cerrarVentana() {
    lightbox.classList.remove("activo");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    imagenAmpliada.src = "";

    if (elementoAnterior) {
        elementoAnterior.focus();
    }
}

// Activar cada fotografía
fotos.forEach(function (foto, indice) {
    foto.addEventListener("click", function () {
        abrirLightbox(indice);
    });
});

// Botón para cerrar
cerrarLightbox.addEventListener("click", cerrarVentana);

// Imagen anterior
anteriorLightbox.addEventListener("click", function () {
    mostrarImagen(indiceActual - 1);
});

// Imagen siguiente
siguienteLightbox.addEventListener("click", function () {
    mostrarImagen(indiceActual + 1);
});

// Cerrar al hacer clic en el fondo oscuro
lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) {
        cerrarVentana();
    }
});

// Atajos de teclado: Escape y flechas
document.addEventListener("keydown", function (evento) {
    if (!lightbox.classList.contains("activo")) {
        return;
    }

    if (evento.key === "Escape") {
        cerrarVentana();
    }

    if (evento.key === "ArrowRight") {
        mostrarImagen(indiceActual + 1);
    }

    if (evento.key === "ArrowLeft") {
        mostrarImagen(indiceActual - 1);
    }
});
/* =================================
   FORMULARIO CONECTADO A WHATSAPP
================================= */

const formulario = document.getElementById("formularioContacto");
const respuestaFormulario = document.getElementById("respuestaFormulario");

// Número de WhatsApp con código de Colombia
const numeroWhatsApp = "573104428485";

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Validar los campos del formulario
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    // Obtener los datos escritos por el cliente
    const nombre = document.getElementById("nombre").value.trim();
    const mascota = document.getElementById("mascota").value.trim();
    const servicio = document.getElementById("servicio").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    // Crear el mensaje que llegará a WhatsApp
    const textoWhatsApp =
        "¡Hola, Patitas Felices! 🐾\n\n" +
        "Quiero solicitar información o agendar una cita.\n\n" +
        "👤 Nombre del cliente: " + nombre + "\n" +
        "🐶 Nombre de la mascota: " + mascota + "\n" +
        "🩺 Servicio solicitado: " + servicio + "\n" +
        "💬 Mensaje: " + mensaje + "\n\n" +
        "Gracias por su atención. 💚";

    // Preparar el enlace de WhatsApp
    const enlaceWhatsApp =
        "https://wa.me/" + numeroWhatsApp +
        "?text=" + encodeURIComponent(textoWhatsApp);

    // Mostrar confirmación e intentar abrir WhatsApp
    respuestaFormulario.textContent =
        "Abriendo WhatsApp para enviar tu solicitud...";

    const ventanaWhatsApp = window.open(
        enlaceWhatsApp,
        "_blank",
        "noopener,noreferrer"
    );

    // Si el navegador bloquea la ventana, ofrecer un enlace directo
    if (!ventanaWhatsApp) {
        respuestaFormulario.textContent =
            "Si WhatsApp no se abrió, pulsa este enlace: ";

        const enlace = document.createElement("a");
        enlace.href = enlaceWhatsApp;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = "Enviar solicitud por WhatsApp";

        respuestaFormulario.appendChild(enlace);
    }
});