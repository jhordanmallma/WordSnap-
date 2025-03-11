document.addEventListener('DOMContentLoaded', function () {
    const langBtn = document.getElementById('language-btn');
    let currentLang = localStorage.getItem('language') || 'es'; // idioma por defecto

    // Crear imagen dentro del botón si no existe
    if (!document.getElementById('lang-icon')) {
        const langIcon = document.createElement('img');
        langIcon.id = 'lang-icon';
        langIcon.style.width = '16px';
        langIcon.style.height = '16px';
        langIcon.style.marginLeft = '5px';
        langBtn.appendChild(langIcon);
    }

    const langIcon = document.getElementById('lang-icon');

    function updateLanguageButton(lang) {
        if (lang === 'es') {
            langBtn.textContent = "Español";
            langIcon.src = "icons/spain.png";
        } else {
            langBtn.textContent = "English";
            langIcon.src = "icons/usa.png";
        }
        langBtn.appendChild(langIcon); // Asegurar que la imagen esté dentro del botón
    }

    function loadLanguage(lang) {
        fetch('json/lang.json')
            .then(response => response.json())
            .then(data => {
                if (data[lang]) {
                    const langData = data[lang];

                    // Actualizar contenido de la página
                    document.getElementById('community-title').innerHTML = langData.community_title;
                    document.getElementById('community-description').innerHTML = langData.community_description;
                    document.getElementById('awards-text').textContent = langData.awards_text;
                    document.getElementById('active-users-text').textContent = langData.active_users_text;
                    document.getElementById('satisfied-users-text').textContent = langData.satisfied_users_text;

                    document.getElementById('features-title').innerHTML = langData.features_title;
                    document.getElementById('features-description').innerHTML = langData.features_description;
                    document.getElementById('feature1-title').innerHTML = langData.feature1_title;
                    document.getElementById('feature1-description').textContent = langData.feature1_description;
                    document.getElementById('feature2-title').innerHTML = langData.feature2_title;
                    document.getElementById('feature2-description').textContent = langData.feature2_description;
                    document.getElementById('feature3-title').innerHTML = langData.feature3_title;
                    document.getElementById('feature3-description').textContent = langData.feature3_description;

                    document.getElementById('footer-tagline').textContent = langData.footer_tagline;
                    document.getElementById('openModalBtn').textContent = langData.subscribe_btn;
                    document.getElementById('footer-product').textContent = langData.footer_product;
                    document.getElementById('footer-company').textContent = langData.footer_company;
                    document.getElementById('footer-support').textContent = langData.footer_support;
                    document.getElementById('footer-social').textContent = langData.footer_social;
                    document.getElementById('footer-download').textContent = langData.footer_download;

                    document.getElementById('footer-product-link1').textContent = langData.footer_product_links.link1;
                    document.getElementById('footer-product-link2').textContent = langData.footer_product_links.link2;
                    document.getElementById('footer-product-link3').textContent = langData.footer_product_links.link3;

                    document.getElementById('footer-company-link1').textContent = langData.footer_company_links.link1;
                    document.getElementById('footer-company-link2').textContent = langData.footer_company_links.link2;
                    document.getElementById('footer-company-link3').textContent = langData.footer_company_links.link3;
                    document.getElementById('footer-company-link4').textContent = langData.footer_company_links.link4;

                    document.getElementById('footer-support-link1').textContent = langData.footer_support_links.link1;
                    document.getElementById('footer-support-link2').textContent = langData.footer_support_links.link2;
                    document.getElementById('footer-support-link3').textContent = langData.footer_support_links.link3;
                    document.getElementById('footer-support-link4').textContent = langData.footer_support_links.link4;

                    document.getElementById('footer-social-link1').textContent = langData.footer_social_links.link1;
                    document.getElementById('footer-social-link2').textContent = langData.footer_social_links.link2;
                    document.getElementById('footer-social-link3').textContent = langData.footer_social_links.link3;
                    document.getElementById('footer-social-link4').textContent = langData.footer_social_links.link4;

                    document.getElementById('footer-download-link1').textContent = langData.footer_download_links.link1;
                    document.getElementById('footer-download-link2').textContent = langData.footer_download_links.link2;
                    document.getElementById('footer-download-link3').textContent = langData.footer_download_links.link3;
                    document.getElementById('footer-download-link4').textContent = langData.footer_download_links.link4;
                    document.getElementById('footer-download-link5').textContent = langData.footer_download_links.link5;

                    document.getElementById('footer-bottom').textContent = langData.footer_bottom;

                    // Actualizar botón de idioma
                    updateLanguageButton(lang);

                    // Enviar mensaje a iframes
                    const iframes = document.querySelectorAll('iframe');
                    iframes.forEach(iframe => {
                        iframe.contentWindow.postMessage({ language: lang }, '*');
                    });

                    // Guardar idioma en localStorage
                    localStorage.setItem('language', lang);
                }
            })
            .catch(error => console.error("Error loading language file:", error));
    }

    langBtn.addEventListener('click', function () {
        currentLang = (currentLang === 'en') ? 'es' : 'en';
        loadLanguage(currentLang);
    });

    // Cargar idioma y actualizar botón al iniciar
    loadLanguage(currentLang);
});
