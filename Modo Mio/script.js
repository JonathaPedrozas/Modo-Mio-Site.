/* ==========================================================
   MODO MIO - JAVASCRIPT
========================================================== */


/* ==========================================================
   HEADER AO ROLAR
========================================================== */

const header = document.getElementById("header");

function updateHeader() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* ==========================================================
   MENU MOBILE
========================================================== */

const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

});


/* Fecha o menu ao clicar em um link */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* ==========================================================
   LINK ATIVO DO MENU
========================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}

window.addEventListener("scroll", updateActiveLink);


/* ==========================================================
   ANIMAÇÕES AO APARECER NA TELA
========================================================== */

const animatedElements = document.querySelectorAll(
    ".section-header, .service-card, .differential, .about-content, .about-image, .structure-content, .structure-image, .contact-info, .contact-form-wrapper, .gallery-item"
);

animatedElements.forEach(element => {

    element.classList.add("reveal");

});


const observer = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach(element => {

    observer.observe(element);

});


/* ==========================================================
   ANO AUTOMÁTICO NO FOOTER
========================================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ==========================================================
   MÁSCARA DE TELEFONE
========================================================== */

const phoneInput = document.getElementById("phone");

if (phoneInput) {

    phoneInput.addEventListener("input", function () {

        let value = this.value.replace(/\D/g, "");

        if (value.length > 11) {

            value = value.substring(0, 11);

        }

        if (value.length <= 10) {

            value = value.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );

        } else {

            value = value.replace(
                /^(\d{2})(\d{5})(\d{0,4}).*/,
                "($1) $2-$3"
            );

        }

        this.value = value;

    });

}


/* ==========================================================
   FORMULÁRIO
========================================================== */

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");


if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const company = document.getElementById("company").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();


        if (!name || !email || !message) {

            showFormMessage(
                "Preencha os campos obrigatórios.",
                "error"
            );

            return;

        }


        /*
            IMPORTANTE:

            Este formulário atualmente NÃO envia e-mail.

            Para colocá-lo em produção, você pode conectar
            posteriormente serviços como:

            - Formspree
            - EmailJS
            - backend próprio
            - PHP + SMTP
            - API de e-mail

            Por enquanto, ele cria uma mensagem para WhatsApp.
        */


        const whatsappNumber = "5511999999999";

        /*
            PREENCHER:

            Troque pelo número real da empresa.

            Exemplo:
            5511987654321
        */


        let whatsappMessage =
            "Olá! Vim pelo site da Modo Mio.%0A%0A" +
            "*Nome:* " + encodeURIComponent(name) + "%0A";


        if (company) {

            whatsappMessage +=
                "*Empresa:* " +
                encodeURIComponent(company) +
                "%0A";

        }


        whatsappMessage +=
            "*E-mail:* " +
            encodeURIComponent(email) +
            "%0A";


        if (phone) {

            whatsappMessage +=
                "*Telefone:* " +
                encodeURIComponent(phone) +
                "%0A";

        }


        if (service) {

            whatsappMessage +=
                "*Serviço:* " +
                encodeURIComponent(service) +
                "%0A";

        }


        whatsappMessage +=
            "%0A*Mensagem:*%0A" +
            encodeURIComponent(message);


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            whatsappMessage;


        showFormMessage(
            "Redirecionando para o WhatsApp...",
            "success"
        );


        setTimeout(() => {

            window.open(
                whatsappURL,
                "_blank"
            );

        }, 700);


    });

}


/* ==========================================================
   MENSAGEM DO FORMULÁRIO
========================================================== */

function showFormMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className =
        "form-message " + type;

}


/* ==========================================================
   FECHAR MENU AO CLICAR FORA
========================================================== */

document.addEventListener("click", function (event) {

    const clickedInsideNav =
        nav.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);


    if (
        !clickedInsideNav &&
        !clickedMenuButton &&
        nav.classList.contains("open")
    ) {

        nav.classList.remove("open");

    }

});


/* ==========================================================
   PREVENIR IMAGENS QUEBRADAS
========================================================== */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", function () {

        this.style.display = "none";

    });

});


/* ==========================================================
   LOG
========================================================== */

console.log(
    "Modo Mio Beneficiamento Têxtil - Website carregado."
);