window.addEventListener('message', (event) => {
    if (event.data && event.data.language) {
      const lang = event.data.language;
      fetch('../json/testimonios-lang.json')
        .then(response => response.json())
        .then(data => {
          if (data[lang]) {
            const t = data[lang];
            // Actualiza los textos de la sección de testimonios
            document.getElementById('reviews-heading').innerHTML = t.reviews_heading;
            document.getElementById('reviews-description').innerHTML = t.reviews_description;
            document.getElementById('reviews-link').textContent = t.reviews_link;
            document.getElementById('review1-text').textContent = t.review1_text;
            document.getElementById('review2-text').textContent = t.review2_text;
            document.getElementById('review3-text').textContent = t.review3_text;
            document.getElementById('review4-text').textContent = t.review4_text;
          }
        })
        .catch(error => console.error("Error loading testimonios translations:", error));
    }
  });
  