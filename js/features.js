document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los videos
  const videos = document.querySelectorAll("video");

  // Función para reproducir todos los videos
  const playAllVideos = () => {
    videos.forEach(video => video.play());
  };

  // Función para pausar todos los videos
  const pauseAllVideos = () => {
    videos.forEach(video => video.pause());
  };

  // Agregar eventos a cada video
  videos.forEach(video => {
    video.addEventListener("mouseenter", playAllVideos);
    video.addEventListener("mouseleave", pauseAllVideos);
  });
});




//menu desplegable de los 3 puntitos

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.querySelector('.chat-messages');
  
  // Delegación de eventos para los botones de opciones
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.chat-options-btn');
    if (btn && chatContainer.contains(btn)) {
      event.stopPropagation();
      const menu = btn.nextElementSibling;
      closeAllMenusExcept(menu);
      menu.classList.toggle('active');
    } else {
      closeAllMenusExcept(null);
    }
  });
  
  // Cerrar el menú al hacer scroll en el contenedor de mensajes
  chatContainer.addEventListener('scroll', () => {
    closeAllMenusExcept(null);
  });
  
  function closeAllMenusExcept(currentMenu) {
    const allMenus = document.querySelectorAll('.chat-options-menu');
    allMenus.forEach(menu => {
      if (menu !== currentMenu) {
        menu.classList.remove('active');
      }
    });
  }
});







  document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-messages');
    
    // Duplicamos el contenido de los mensajes para crear el efecto de loop infinito
    chatContainer.innerHTML += chatContainer.innerHTML;
    
    // Calcula la altura original (la mitad del scrollHeight, ya que duplicamos el contenido)
    const originalHeight = chatContainer.scrollHeight / 2;
    
    // Agrega un evento de scroll al contenedor
    chatContainer.addEventListener('scroll', () => {
      // Si se ha desplazado más allá de la altura del primer grupo de mensajes...
      if (chatContainer.scrollTop >= originalHeight) {
        // Ajusta el scroll para que vuelva al inicio (sin interrupción visual)
        chatContainer.scrollTop -= originalHeight;
      }
      
      // Opcionalmente, si se desea permitir el scroll hacia arriba infinito, se puede hacer:
      if (chatContainer.scrollTop <= 0) {
        chatContainer.scrollTop += originalHeight;
      }
    });
  });
  

  // Seleccionamos los elementos necesarios
const leftArrow = document.querySelector('.story-arrow.left');
const rightArrow = document.querySelector('.story-arrow.right');
const storySlider = document.getElementById('storySlider');
const indicators = document.querySelectorAll('.story-indicators .indicator');

// Función para actualizar los indicadores en función del scroll
function updateIndicators() {
  const scrollLeft = storySlider.scrollLeft;
  const width = storySlider.clientWidth;
  const currentIndex = Math.round(scrollLeft / width);
  
  indicators.forEach(ind => ind.classList.remove('active'));
  if (indicators[currentIndex]) {
    indicators[currentIndex].classList.add('active');
  }
}


// Eventos de clic en las flechas
leftArrow.addEventListener('click', () => {
  const width = storySlider.clientWidth;
  storySlider.scrollBy({ left: -width, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  const width = storySlider.clientWidth;
  storySlider.scrollBy({ left: width, behavior: 'smooth' });
});

// Actualizar indicadores durante el scroll
storySlider.addEventListener('scroll', updateIndicators);




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
