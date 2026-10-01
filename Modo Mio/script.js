/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


if (menuToggle && nav) {

    const icon =
        menuToggle.querySelector("i");


    menuToggle.addEventListener(
        "click",
        () => {

            const isActive =
                nav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isActive)
            );


            menuToggle.setAttribute(
                "aria-label",
                isActive
                    ? "Fechar menu"
                    : "Abrir menu"
            );


            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isActive
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isActive
                );

            }

        }
    );


    nav.querySelectorAll("a").forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("active");


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );


                    if (icon) {

                        icon.classList.add(
                            "fa-bars"
                        );

                        icon.classList.remove(
                            "fa-xmark"
                        );

                    }

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                nav.classList.contains("active")
            ) {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );


                if (icon) {

                    icon.classList.add(
                        "fa-bars"
                    );

                    icon.classList.remove(
                        "fa-xmark"
                    );

                }

            }

        }
    );

}



/* =========================================================
   CARROSSÉIS DAS CAMISETAS
   Cada marca possui seu próprio carrossel
========================================================= */

const shirtCategories =
    document.querySelectorAll(
        ".shirt-category"
    );


shirtCategories.forEach(
    (category) => {


        const track =
            category.querySelector(
                ".shirt-track"
            );


        const slides =
            category.querySelectorAll(
                ".shirt-slide"
            );


        const prev =
            category.querySelector(
                ".shirt-prev"
            );


        const next =
            category.querySelector(
                ".shirt-next"
            );


        const dotsContainer =
            category.querySelector(
                ".shirt-dots"
            );


        if (
            !track ||
            !slides.length ||
            !prev ||
            !next ||
            !dotsContainer
        ) {

            return;

        }


        let currentIndex = 0;


        /* CRIA OS PONTOS */

        slides.forEach(
            (_, index) => {


                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type = "button";


                dot.classList.add(
                    "shirt-dot"
                );


                dot.setAttribute(
                    "aria-label",
                    `Ir para a foto ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        showShirtSlide(index);

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );


        const dots =
            dotsContainer.querySelectorAll(
                ".shirt-dot"
            );



        /* MOSTRA A FOTO */

        function showShirtSlide(index) {


            if (index < 0) {

                currentIndex =
                    slides.length - 1;

            }

            else if (
                index >= slides.length
            ) {

                currentIndex = 0;

            }

            else {

                currentIndex = index;

            }


            track.style.transform =
                `translateX(-${currentIndex * 100}%)`;


            dots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === currentIndex
                    );

                }
            );

        }



        /* BOTÃO ANTERIOR */

        prev.addEventListener(
            "click",
            () => {

                showShirtSlide(
                    currentIndex - 1
                );

            }
        );



        /* BOTÃO PRÓXIMO */

        next.addEventListener(
            "click",
            () => {

                showShirtSlide(
                    currentIndex + 1
                );

            }
        );



        /* ARRASTAR NO CELULAR */

        let touchStartX = 0;

        let touchEndX = 0;


        track.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        track.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;


                const difference =
                    touchStartX - touchEndX;


                if (
                    Math.abs(difference) < 50
                ) {

                    return;

                }


                if (difference > 0) {

                    showShirtSlide(
                        currentIndex + 1
                    );

                }

                else {

                    showShirtSlide(
                        currentIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );



        /* INICIA NA PRIMEIRA FOTO */

        showShirtSlide(0);

    }
);



/* =========================================================
   GALERIA DA EMPRESA
========================================================= */

const galleryTrack =
    document.getElementById(
        "galleryTrack"
    );


const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const galleryPrev =
    document.getElementById(
        "galleryPrev"
    );


const galleryNext =
    document.getElementById(
        "galleryNext"
    );


const galleryDots =
    document.getElementById(
        "galleryDots"
    );


let galleryIndex = 0;


if (
    galleryTrack &&
    galleryItems.length &&
    galleryPrev &&
    galleryNext &&
    galleryDots
) {


    galleryItems.forEach(
        (_, index) => {


            const dot =
                document.createElement(
                    "button"
                );


            dot.type = "button";


            dot.classList.add(
                "gallery-dot"
            );


            dot.setAttribute(
                "aria-label",
                `Ir para a foto ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    showGallerySlide(index);

                }
            );


            galleryDots.appendChild(
                dot
            );

        }
    );


    const dots =
        galleryDots.querySelectorAll(
            ".gallery-dot"
        );



    function showGallerySlide(index) {


        if (index < 0) {

            galleryIndex =
                galleryItems.length - 1;

        }

        else if (
            index >= galleryItems.length
        ) {

            galleryIndex = 0;

        }

        else {

            galleryIndex = index;

        }


        galleryTrack.style.transform =
            `translateX(-${galleryIndex * 100}%)`;


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === galleryIndex
                );

            }
        );

    }



    galleryPrev.addEventListener(
        "click",
        () => {

            showGallerySlide(
                galleryIndex - 1
            );

        }
    );


    galleryNext.addEventListener(
        "click",
        () => {

            showGallerySlide(
                galleryIndex + 1
            );

        }
    );



    /* SWIPE */

    let touchStartX = 0;

    let touchEndX = 0;


    galleryTrack.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    galleryTrack.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                showGallerySlide(
                    galleryIndex + 1
                );

            }

            else {

                showGallerySlide(
                    galleryIndex - 1
                );

            }

        },
        {
            passive: true
        }
    );


    showGallerySlide(0);

}



/* =========================================================
   FORMULÁRIO → WHATSAPP
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {


    contactForm.addEventListener(
        "submit",
        (event) => {


            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim() || "";


            const company =
                document
                    .getElementById("company")
                    ?.value
                    .trim() || "";


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim() || "";


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim() || "";


            const whatsappNumber =
                "5511999708141";


            let text =
                "Olá, Modo Mio!\n\n" +
                "Gostaria de entrar em contato " +
                "para apresentar um projeto.\n\n" +
                `Nome: ${name}\n`;


            if (company) {

                text +=
                    `Empresa: ${company}\n`;

            }


            text +=
                `E-mail: ${email}\n\n` +
                `Mensagem:\n${message}`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=` +
                encodeURIComponent(text);


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}



/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header =
    document.getElementById(
        "header"
    );


if (header) {


    function updateHeader() {


        if (
            window.scrollY > 50
        ) {

            header.classList.add(
                "scrolled"
            );

        }

        else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}