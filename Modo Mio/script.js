/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");


if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");


        const icon = menuToggle.querySelector("i");


        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    });


    /* Fecha o menu ao clicar em um link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");


            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}



/* =========================================================
   CARROSSEL DA GALERIA
========================================================= */

const galleryTrack =
    document.getElementById("galleryTrack");

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryPrev =
    document.getElementById("galleryPrev");

const galleryNext =
    document.getElementById("galleryNext");

const galleryDots =
    document.getElementById("galleryDots");


let currentGallery = 0;



/* =========================================================
   CRIAR BOLINHAS
========================================================= */

if (
    galleryItems.length > 0 &&
    galleryDots
) {

    galleryItems.forEach((item, index) => {

        const dot =
            document.createElement("button");


        dot.type = "button";

        dot.classList.add("gallery-dot");


        dot.setAttribute(
            "aria-label",
            `Ir para a foto ${index + 1}`
        );


        dot.addEventListener("click", () => {

            showGallerySlide(index);

        });


        galleryDots.appendChild(dot);

    });

}



/* =========================================================
   MOSTRAR FOTO
========================================================= */

function showGallerySlide(index) {

    if (
        !galleryTrack ||
        galleryItems.length === 0
    ) {

        return;

    }


    /* Se passar da última */

    if (
        index >= galleryItems.length
    ) {

        index = 0;

    }


    /* Se voltar antes da primeira */

    if (index < 0) {

        index = galleryItems.length - 1;

    }


    currentGallery = index;


    /* Movimento */

    galleryTrack.style.transform =
        `translateX(-${currentGallery * 100}%)`;


    /* Atualizar bolinhas */

    const dots =
        document.querySelectorAll(".gallery-dot");


    dots.forEach((dot, dotIndex) => {

        dot.classList.toggle(
            "active",
            dotIndex === currentGallery
        );

    });

}



/* =========================================================
   BOTÃO ANTERIOR
========================================================= */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        () => {

            showGallerySlide(
                currentGallery - 1
            );

        }
    );

}



/* =========================================================
   BOTÃO PRÓXIMO
========================================================= */

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        () => {

            showGallerySlide(
                currentGallery + 1
            );

        }
    );

}



/* =========================================================
   INICIAR GALERIA
========================================================= */

showGallerySlide(0);



/* =========================================================
   TECLAS DO COMPUTADOR
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowLeft") {

            showGallerySlide(
                currentGallery - 1
            );

        }


        if (event.key === "ArrowRight") {

            showGallerySlide(
                currentGallery + 1
            );

        }

    }
);



/* =========================================================
   SWIPE NO CELULAR
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (galleryTrack) {

    galleryTrack.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    galleryTrack.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

        },
        { passive: true }
    );

}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* Arrastou para a esquerda */

    if (difference > 50) {

        showGallerySlide(
            currentGallery + 1
        );

    }


    /* Arrastou para a direita */

    if (difference < -50) {

        showGallerySlide(
            currentGallery - 1
        );

    }

}



/* =========================================================
   FORMULÁRIO → WHATSAPP
========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();


            const company =
                document.getElementById("company").value.trim();


            const email =
                document.getElementById("email").value.trim();


            const message =
                document.getElementById("message").value.trim();


            const whatsappNumber =
                "5511999708141";


            const text =
                `Olá! Vim pelo site da Modo Mio.%0A%0A` +
                `*Nome:* ${name}%0A` +
                `*Empresa:* ${company || "Não informado"}%0A` +
                `*E-mail:* ${email}%0A%0A` +
                `*Mensagem:*%0A${message}`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${text}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}



/* =========================================================
   ANO AUTOMÁTICO DO FOOTER
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header =
    document.getElementById("header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }
);