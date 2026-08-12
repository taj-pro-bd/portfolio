/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("preloader")
            .classList.add("hide");

    }, 700);

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("mobile-open");

});


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("mobile-open");

    });

});


/* =====================================================
   MOUSE 3D EFFECT
===================================================== */

const orb = document.getElementById("orb");

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 700) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

    orb.style.transform =
        `translateY(-50%)
         translate(${x * 15}px, ${y * 15}px)`;

});


/* =====================================================
   PARTICLE BACKGROUND
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 1.5 + .3;

        this.speedX =
            (Math.random() - .5) * .3;

        this.speedY =
            (Math.random() - .5) * .3;

        this.opacity =
            Math.random() * .5;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(183,255,60,${this.opacity})`;

        ctx.fill();
    }
}


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 700
            ? 60
            : 120;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }
}

createParticles();


function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(
                        183,
                        255,
                        60,
                        ${0.08 *
                        (1 - distance / 120)}
                    )`;

                ctx.lineWidth = .5;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();
            }
        }
    }
}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".service-card, .project-card, .skill, .about-text"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .8s ease, transform .8s ease";

    revealObserver.observe(element);

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const button =
            contactForm.querySelector(
                ".submit-btn"
            );

        const oldText =
            button.innerHTML;

        button.innerHTML =
            "Message Sent ?";

        button.style.background =
            "#ffffff";

        setTimeout(() => {

            button.innerHTML =
                oldText;

            button.style.background =
                "";

            contactForm.reset();

        }, 2500);

    }
);


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(".navbar");

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(5,5,5,.92)";

        } else {

            navbar.style.background =
                "rgba(5,5,5,.7)";

        }

    }
);