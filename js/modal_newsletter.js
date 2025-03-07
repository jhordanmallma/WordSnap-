document.addEventListener("DOMContentLoaded", function () {
    const openModalBtn = document.getElementById("openModalBtn");

    // Crear modal dinámico
    const modalHTML = `
        <div id="newsletterModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Subscribe to our Newsletter</h2>
                <p>Stay updated with the latest news from WordSnap.</p>
                <input type="email" id="emailInput" placeholder="Enter your email" required>
                <button id="subscribeBtn">Subscribe</button>
                <p id="responseMessage" style="margin-top: 10px;"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("newsletterModal");
    const emailInput = document.getElementById("emailInput");
    const subscribeBtn = document.getElementById("subscribeBtn");
    const responseMessage = document.getElementById("responseMessage");

    function positionModal() {
        const rect = openModalBtn.getBoundingClientRect();
        modal.style.top = `${rect.bottom + window.scrollY + 5}px`;
        modal.style.left = `${rect.left + window.scrollX}px`;
    }

    // Mostrar modal
    openModalBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (modal.style.display === "block") {
            modal.style.display = "none";
        } else {
            positionModal();
            modal.style.display = "block";
        }
    });

    // Cerrar modal al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!modal.contains(event.target) && event.target !== openModalBtn) {
            modal.style.display = "none";
        }
    });

    // Enviar datos con fetch
    subscribeBtn.addEventListener("click", function () {
        const email = emailInput.value.trim();

        if (email === "") {
            responseMessage.textContent = "Por favor, ingresa un correo.";
            responseMessage.style.color = "red";
            return;
        }

        fetch("archivosphp/subscribe.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(email)}`,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            responseMessage.textContent = data.message;
            responseMessage.style.color = data.status === "success" ? "green" : "red";
            if (data.status === "success") {
                emailInput.value = "";
                setTimeout(() => {
                    modal.style.display = "none";
                }, 2000);
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
            responseMessage.textContent = "Error al conectar con el servidor.";
            responseMessage.style.color = "red";
        });
    });
});
