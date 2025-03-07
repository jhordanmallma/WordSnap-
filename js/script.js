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


