document.addEventListener("DOMContentLoaded", function () {
    // --- Lógica de los submenús ---
    const submenuToggles = document.querySelectorAll(".submenu-toggle");
  
    submenuToggles.forEach(toggle => {
        toggle.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que el enlace navegue a otra página
  
            const submenu = this.nextElementSibling;
            const isOpen = submenu.classList.contains("active");
  
            // Cierra todos los demás submenús antes de abrir el actual
            document.querySelectorAll(".submenu").forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove("active");
                    menu.style.opacity = "0";
                    menu.style.transform = "translateY(-10px)";
                    menu.previousElementSibling.classList.remove("active");
                }
            });
  
            // Alternar el estado del submenú actual
            if (isOpen) {
                submenu.classList.remove("active");
                submenu.style.opacity = "0";
                submenu.style.transform = "translateY(-10px)";
                this.classList.remove("active");
            } else {
                submenu.classList.add("active");
                submenu.style.opacity = "1";
                submenu.style.transform = "translateY(0)";
                this.classList.add("active");
            }
        });
    });
  
    // Cerrar submenús al hacer clic fuera de ellos
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu")) {
            document.querySelectorAll(".submenu").forEach(menu => {
                menu.classList.remove("active");
                menu.style.opacity = "0";
                menu.style.transform = "translateY(-10px)";
                menu.previousElementSibling.classList.remove("active");
            });
        }
    });
  
    // --- Lógica para el botón hamburguesa ---
    // Asegúrate de tener en tu HTML algo como:
    // <button class="hamburger" aria-label="Toggle navigation">
    //   <span></span>
    //   <span></span>
    //   <span></span>
    // </button>
  
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const navButtons = document.querySelector(".nav-buttons");
  
    // Verificamos que existan los elementos (por si en alguna página no están)
    if (hamburger && menu && navButtons) {
      hamburger.addEventListener("click", function () {
        // Alternamos la clase "active" para mostrar/ocultar
        menu.classList.toggle("active");
        navButtons.classList.toggle("active");
      });
    }
  });
  


 
  document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("mi-seccion");

    if (!section) {
        console.error("Error: No se encontró la sección con id 'mi-seccion'");
        return;
    }

    // Excluir los menús de "Features" y "Download"
    const excludedSelectors = [".features-menu", ".download-menu", ".submenu"];
    
    const elements = [...section.querySelectorAll("*")].filter(el => {
        return !excludedSelectors.some(selector => el.matches(selector));
    });

    // Agregamos la clase base a cada elemento antes de la animación
    elements.forEach(el => el.classList.add("fade-in-section"));

    function fadeInElements() {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add("show");
            }, index * 50); // Reducido de 100ms a 50ms
        });
    }

    // Detectar cuando la sección entra en la pantalla
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            fadeInElements();
            observer.disconnect();
        }
    }, { threshold: 0.2 });

    observer.observe(section);
});
