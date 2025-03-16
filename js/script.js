document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todas las secciones que deben tener el fade in
    const sections = document.querySelectorAll(".mi-seccion");
    
    sections.forEach(section => {
        // Selecciona todos los elementos dentro de cada sección
        const elements = section.querySelectorAll("*");
        
        // Agrega la clase base de animación a cada elemento
        elements.forEach(el => el.classList.add("fade-in-section"));
        
        // Función para animar de forma secuencial
        function fadeInElements() {
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show");
                }, index * 100); // Ajusta el retraso según prefieras
            });
        }
        
        // Usamos IntersectionObserver para disparar la animación cuando la sección esté visible
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fadeInElements();
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        
        observer.observe(section);
    });
});



window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});




window.addEventListener("message", function(event) {
    if (event.data === "scrollToFeatures") {
        const featuresIframe = document.getElementById("features-iframe");
        if (featuresIframe) {
            featuresIframe.scrollIntoView({ behavior: "smooth" });
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const statsSection = document.querySelector(".stats");
    if (!statsSection) return;

    const stats = [
        { selector: "#awards-text", value: 80, suffix: "+" },
        { selector: "#active-users-text", value: 9.8, suffix: "M+" },
        { selector: "#satisfied-users-text", value: 99, suffix: "%" },
    ];

    function animateCounter(element, endValue, suffix, isDecimal = false) {
        let startValue = 0;
        let duration = 2000; // Duración de la animación en ms
        let increment = endValue / (duration / 16); // Incremento por frame (~60fps)

        function updateCounter() {
            startValue += increment;
            if (startValue >= endValue) {
                element.innerHTML = endValue + suffix; // Asegurar el valor final
            } else {
                let displayValue = isDecimal ? startValue.toFixed(1) : Math.round(startValue);
                element.innerHTML = displayValue + suffix;
                requestAnimationFrame(updateCounter);
            }
        }
        requestAnimationFrame(updateCounter);
    }

    // Activar animación cuando la sección aparece en pantalla
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            stats.forEach(stat => {
                const element = document.querySelector(stat.selector);
                if (element) {
                    let isDecimal = stat.value % 1 !== 0; // Verificar si el número es decimal
                    animateCounter(element.previousElementSibling, stat.value, stat.suffix, isDecimal);
                }
            });
            observer.disconnect(); // Se ejecuta solo una vez
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
});
