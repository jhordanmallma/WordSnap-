window.addEventListener('message', (event) => {
    if (event.data && event.data.language) {
      const lang = event.data.language;
      fetch('../json/header-hero-lang.json')
        .then(response => response.json())
        .then(data => {
          if (data[lang]) {
            const t = data[lang];
            // Actualiza la navegación
            document.getElementById('nav-features').textContent = t.nav_features;
            document.getElementById('nav-download').textContent = t.nav_download;
            document.getElementById('nav-blog').textContent = t.nav_blog;
            // Submenú "Features"
            document.getElementById('submenu-communication').textContent = t.submenu_communication;
            document.getElementById('submenu-collaboration').textContent = t.submenu_collaboration;
            document.getElementById('submenu-security').textContent = t.submenu_security;
            // Submenú "Download"
            document.getElementById('submenu-download-windows').textContent = t.submenu_download_windows;
            document.getElementById('submenu-download-macos').textContent = t.submenu_download_macos;
            document.getElementById('submenu-download-android').textContent = t.submenu_download_android;
            document.getElementById('submenu-download-ios').textContent = t.submenu_download_ios;
            // Botones de navegación
            document.getElementById('btn-sign-in').textContent = t.btn_sign_in;
            document.getElementById('btn-join-today').textContent = t.btn_join_today;
            // Contenido del Hero
            document.getElementById('hero-highlight-text').innerHTML = t.hero_highlight_text;
            document.getElementById('hero-title').innerHTML = t.hero_title;
            document.getElementById('hero-description').textContent = t.hero_description;
            document.getElementById('btn-learn-more').textContent = t.btn_learn_more;
            document.getElementById('btn-get-started').textContent = t.btn_get_started;
          }
        })
        .catch(error => console.error("Error loading header hero translations:", error));
    }
  });
  