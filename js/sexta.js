document.addEventListener('DOMContentLoaded', () => {
  // Seleccionamos el contenedor externo, el área de scroll y el wrapper de mensajes
  const containerOuter = document.querySelector('.mensajes-container');
  const scrollContent = document.querySelector('.scroll-content');
  const mensajesWrapper = document.querySelector('.mensajes-wrapper');

  // Configuramos el wrapper de mensajes
  mensajesWrapper.style.position = 'relative';
  mensajesWrapper.style.width = '1558px';
  mensajesWrapper.style.height = '320px';

  // Datos de los mensajes (originales y nuevos)
  const mensajesData = [
    {
      name: 'Harry Maguire',
      text: 'You need to improve now',
      time: '09:12 AM',
      avatar: '../icons/hombre.png',
      left: 100,
      top: 18
    },
    {
      name: 'Mason Greenwood',
      text: 'Still working on that finishing touch!',
      time: '09:12 AM',
      avatar: '../icons/hombre2.png',
      left: 450,
      top: 18
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
    },
    // Nuevos mensajes horizontales:
    {
      name: 'Kevin De Bruyne',
      text: 'Let’s create a masterpiece on the field!',
      time: '10:05 AM',
      avatar: '../icons/hombre2.png',
      left: 800,
      top: 18
    },
    {
      name: 'Lionel Messi',
      text: 'Magic happens when you least expect it!',
      time: '10:12 AM',
      avatar: '../icons/mujer.png',
      left: 1150,
      top: 18
    },
    {
      name: 'Cristiano Ronaldo',
      text: 'The grind never stops, keep pushing!',
      time: '10:20 AM',
      avatar: '../icons/hombre.png',
      left: 745,
      top: 129
    },
    {
      name: 'Kylian Mbappé',
      text: 'Speed and precision in every move!',
      time: '10:25 AM',
      avatar: '../icons/nino.png',
      left: 1095,
      top: 129
    },
    {
      name: 'Neymar Jr.',
      text: 'Creativity is my middle name.',
      time: '10:30 AM',
      avatar: '../icons/mujer.png',
      left: 800,
      top: 240
    },
    {
      name: 'Luka Modrić',
      text: 'Wisdom on and off the pitch.',
      time: '10:35 AM',
      avatar: '../icons/hombre2.png',
      left: 1150,
      top: 240
    }
  ];

  // Generamos cada tarjeta de mensaje y la agregamos al wrapper
  mensajesData.forEach(msg => {
    const card = document.createElement('div');
    card.classList.add('mensaje-card');
    card.style.position = 'absolute';
    card.style.left = `${msg.left}px`;
    card.style.top = `${msg.top}px`;
    card.style.width = '300px';
    card.style.height = '88px';
    card.style.padding = '0 12px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';

    card.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img 
          src="${msg.avatar}" 
          alt="${msg.name}" 
          style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;"
        >
        <div>
          <div style="display: flex; align-items: baseline;">
            <strong style="font-size: 14px; margin: 0; margin-bottom: 7px;">
              ${msg.name}
            </strong>
            <span style="font-size: 12px; color: #888; margin-left: 62px; white-space: nowrap;">
              ${msg.time}
            </span>
          </div>
          <p style="font-size: 13px; margin: 0; color: #5A7184;">
            ${msg.text}
          </p>
        </div>
      </div>
    `;
    mensajesWrapper.appendChild(card);
  });

  // Seleccionamos las flechas (que están fijas en el contenedor externo)
  const scrollRightBtn = document.getElementById('scrollRight');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollStep = 320; // Píxeles a desplazar por clic

  // Eventos de clic para las flechas; el scroll se aplica al área de scroll (scrollContent)
  scrollRightBtn.addEventListener('click', () => {
    scrollContent.scrollLeft += scrollStep;
    updateArrowVisibility();
  });
  scrollLeftBtn.addEventListener('click', () => {
    scrollContent.scrollLeft -= scrollStep;
    updateArrowVisibility();
  });

  // Función para actualizar la visibilidad de las flechas según la posición del scroll
  function updateArrowVisibility() {
    if (scrollContent.scrollLeft <= 0) {
      scrollLeftBtn.style.display = 'none';
    } else {
      scrollLeftBtn.style.display = 'block';
    }
    if (scrollContent.scrollLeft >= scrollContent.scrollWidth - scrollContent.clientWidth - 1) {
      scrollRightBtn.style.display = 'none';
    } else {
      scrollRightBtn.style.display = 'block';
    }
  }

  scrollContent.addEventListener('scroll', updateArrowVisibility);

  // Implementamos scroll por arrastre (drag) sobre el área de scroll
  let isDown = false;
  let startX;
  let scrollLeftPos;
  
  scrollContent.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - scrollContent.offsetLeft;
    scrollLeftPos = scrollContent.scrollLeft;
  });
  scrollContent.addEventListener('mouseleave', () => {
    isDown = false;
  });
  scrollContent.addEventListener('mouseup', () => {
    isDown = false;
  });
  scrollContent.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContent.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContent.scrollLeft = scrollLeftPos - walk;
    updateArrowVisibility();
  });

  // Asignamos los eventos de mouseenter/mouseleave al contenedor externo para que las flechas
  // permanezcan visibles mientras el cursor esté en cualquier parte (incluyendo las flechas)
  containerOuter.addEventListener('mouseenter', () => {
    updateArrowVisibility();
    scrollRightBtn.style.display = 'block';
    scrollLeftBtn.style.display = 'block';
  });
  containerOuter.addEventListener('mouseleave', () => {
    scrollRightBtn.style.display = 'none';
    scrollLeftBtn.style.display = 'none';
  });

  // (Opcional) Animación de fade-in para la sección
  const sections = document.querySelectorAll(".mi-seccion");
  sections.forEach(section => {
    const elements = section.querySelectorAll("*");
    elements.forEach(el => el.classList.add("fade-in-section"));
    function fadeInElements() {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("show");
        }, index * 50);
      });
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fadeInElements();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
  });
});
