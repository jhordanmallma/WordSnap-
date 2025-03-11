window.addEventListener('message', (event) => {
    if (event.data && event.data.language) {
      const lang = event.data.language;
      fetch('../json/features-lang.json')
        .then(response => response.json())
        .then(data => {
          if (data[lang]) {
            const t = data[lang];
            // Actualizar título y descripción de la sección
            document.getElementById('features-title').innerHTML = t.section_title;
            document.getElementById('features-description').innerHTML = t.section_description;
            
            // Primera Tarjeta - Chat interactivo
            document.getElementById('chat-badge').textContent = t.chat_badge;
            document.getElementById('chat-card-title').innerHTML = t.chat_card_title;
            document.getElementById('chat-card-description').innerHTML = t.chat_card_description;
            document.getElementById('chat-header-text').textContent = t.chat_header_text;
            document.getElementById('chat-header-btn').textContent = t.chat_header_btn;
            document.getElementById('chat-message1').textContent = t.chat_message1;
            document.getElementById('chat-message2').textContent = t.chat_message2;
            document.getElementById('chat-message3').textContent = t.chat_message3;
            document.getElementById('chat-message4').textContent = t.chat_message4;
            
            // Segunda Tarjeta - Video principal
            document.getElementById('video-call-title').textContent = t.video_call_title;
            document.getElementById('video-call-badge').textContent = t.video_call_badge;
            document.getElementById('video-call-card-title').innerHTML = t.video_call_card_title;
            document.getElementById('video-call-card-description').innerHTML = t.video_call_card_description;
            
            // Tercera Tarjeta - Historias deslizables
            document.getElementById('stories-badge').textContent = t.stories_badge;
            document.getElementById('stories-card-title').innerHTML = t.stories_card_title;
            document.getElementById('stories-card-description').innerHTML = t.stories_card_description;
          }
        })
        .catch(error => console.error("Error loading features translations:", error));
    }
  });
  