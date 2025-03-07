document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.mensajes-wrapper');
  
    // Ajusta este ancho según tu diseño para que quepan los mensajes
    wrapper.style.position = 'relative';
    wrapper.style.width = '700px';
    wrapper.style.height = '320px'; // Ajusta la altura a tu gusto
    
    const mensajesData = [
      {
        name: 'Harry Maguire',
        text: 'You need to improve now',
        time: '09:12 AM',
        avatar: '../icons/hombre.png',
        left: 100,   // px
        top: 18     // px
      },
      {
        name: 'Mason Greenwood',
        text: 'Still working on that finishing touch!',
        time: '09:12 AM',
        avatar: '../icons/hombre2.png',
        left: 450,  // px
        top: 18     // px
      },
      {
        name: 'Garnacho',
        text: 'Get more focus next week!',
        time: '08:19 AM',
        avatar: '../icons/mujer.png',
        left: 45,  
        top: 129  
      },
      {
        name: 'Rasmus Højlund',
        text: 'Bos, I need to...',
        time: '08:45 AM',
        avatar: '../icons/nino.png',
        left: 395,
        top: 129
      },
      {
        name: 'Lisandro Martínez',
        text: 'I need a great partner sir',
        time: '09:12 AM',
        avatar: '../icons/mujer.png',
        left: 100,
        top: 240
      },
      {
        name: 'André Onana',
        text: 'I am ready for the challenge!',
        time: '09:12 AM',
        avatar: '../icons/nino.png',
        left: 450,
        top: 240
      }
    ];
  
    mensajesData.forEach(msg => {
      const card = document.createElement('div');
      card.classList.add('mensaje-card');
      
      // Posicionamiento y tamaño de la tarjeta
      card.style.position = 'absolute';
      card.style.left = `${msg.left}px`;
      card.style.top = `${msg.top}px`;
      card.style.width = '300px';  
      card.style.height = '88px';  // Forzamos la altura
      card.style.padding = '0 12px'; // Ajusta si quieres más/menos padding
      
      // Para centrar verticalmente el contenido
      card.style.display = 'flex';
      card.style.alignItems = 'center'; 
    
      // Estructura interna del mensaje
      card.innerHTML = `
  <div style="display: flex; align-items: center;">
    <img 
      src="${msg.avatar}" 
      alt="${msg.name}" 
      style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;"
    >
    <div>
      <!-- Fila con el nombre y la hora -->
      <div style="display: flex; align-items: baseline;">
  <strong style="font-size: 14px; margin: 0; margin-bottom: 7px; ">
    ${msg.name}
  </strong>
  <span style="font-size: 12px; color: #888; margin-left: 62px; white-space: nowrap;">
    ${msg.time}
  </span>
</div>
      <!-- Mensaje debajo de la fila anterior -->
      <p style="font-size: 13px; margin: 0; color: #5A7184;">
        ${msg.text}
      </p>
    </div>
  </div>
`;

      
      wrapper.appendChild(card);
    });
    
  
    // (Opcional) Desplazamiento horizontal con drag
    const container = document.querySelector('.mensajes-container');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
  
    container.addEventListener('mouseleave', () => {
      isDown = false;
    });
  
    container.addEventListener('mouseup', () => {
      isDown = false;
    });
  
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
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
              }, index * 50); // Ajusta el retraso según prefieras
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
