document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.querySelector('.reviews-container');
    
    if (reviewsContainer) {
        // Clonamos los mensajes originales y los añadimos al final para simular el bucle infinito
        const originalReviews = Array.from(reviewsContainer.children);
        originalReviews.forEach(review => {
            const clone = review.cloneNode(true);
            reviewsContainer.appendChild(clone);
        });
        
        let isScrolling = false;
        
        function smoothResetScroll() {
            if (reviewsContainer.scrollTop + reviewsContainer.clientHeight >= reviewsContainer.scrollHeight - 10) {
                isScrolling = true;
                reviewsContainer.style.scrollBehavior = 'auto';
                reviewsContainer.scrollTop = 1;
                reviewsContainer.style.scrollBehavior = 'smooth';
                isScrolling = false;
            }
            
            if (reviewsContainer.scrollTop <= 0) {
                isScrolling = true;
                reviewsContainer.style.scrollBehavior = 'auto';
                reviewsContainer.scrollTop = reviewsContainer.scrollHeight / 2;
                reviewsContainer.style.scrollBehavior = 'smooth';
                isScrolling = false;
            }
        }
        
        reviewsContainer.addEventListener('scroll', () => {
            if (!isScrolling) {
                smoothResetScroll();
            }
        });

        // Agregar el efecto de desvanecimiento a cada review
        const messages = Array.from(document.querySelectorAll(".review"));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transition = "opacity 0.5s ease-in-out";
                } else {
                    entry.target.style.opacity = 0.3;
                }
            });
        }, { threshold: 0.5 });
        
        messages.forEach(msg => observer.observe(msg));
    }
});

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
                }, index * 30); // Ajusta el retraso según prefieras
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
  


document.addEventListener("DOMContentLoaded", function () {
    const exploreLink = document.querySelector(".explore-link");

    exploreLink.addEventListener("click", function (event) {
        event.preventDefault(); // Evita la navegación predeterminada

        // Enviar mensaje a la ventana principal
        window.parent.postMessage("scrollToFeatures", "*");
    });
});
