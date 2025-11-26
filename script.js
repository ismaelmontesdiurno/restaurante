// Clave para guardar el resultado en localStorage
const STORAGE_KEY = "perfilGastronomico";

// Renderiza la pantalla final
function renderResultado(data) {
    const { nick, perfil, descripcion, extra } = data;

    document.body.className = "resultado-body";
    document.body.innerHTML = `
        <div class="profile-wrapper">

            <div class="profile-card">
                <div class="profile-avatar">
                    <img src="perfil.jpg" alt="Foto de perfil">
                </div>

                <div class="profile-name">${nick}</div>
                <div class="profile-role">${perfil}</div>

                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="profile-stat-value">8</div>
                        <div class="profile-stat-label">Preguntas</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">1</div>
                        <div class="profile-stat-label">Perfil</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">100%</div>
                        <div class="profile-stat-label">Completado</div>
                    </div>
                </div>
            </div>

            <div class="result-card">
                <div class="result-card-title">Descripción</div>
                <p class="result-card-text">${descripcion}</p>

                <div class="result-card-title">Recomendación</div>
                <p class="result-card-sub">${extra}</p>

                <button class="reset-btn" onclick="reiniciarTest()">Volver a hacer test</button>
            </div>

        </div>
    `;
}

// Reinicia el test borrando el localStorage
function reiniciarTest() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
}


// Procesa el formulario
function handleSubmit(e) {
    e.preventDefault();

    const nickInput = document.querySelector('input[name="nickname"]');
    const nick = (nickInput.value || "").trim() || "Tu perfil";

    const r1 = document.querySelector('input[name="q1"]:checked');
    const r2 = document.querySelector('input[name="q2"]:checked');
    const r3 = document.querySelector('input[name="q3"]:checked');
    const r4 = document.querySelector('input[name="q4"]:checked');
    const r5 = document.querySelector('input[name="q5"]:checked');
    const r6 = document.querySelector('input[name="q6"]:checked');
    const r7 = document.querySelector('input[name="q7"]:checked');

    if (!r1 || !r2 || !r3 || !r4 || !r5 || !r6 || !r7) {
        alert("Por favor responde todas las preguntas.");
        return;
    }

    let puntaje_relajado = 0;
    let puntaje_practico = 0;
    let puntaje_explorador = 0;
    let puntaje_fan = 0;

    // PERFIL 1 — Relajado Nocturno
    if (r1.value === "7-9pm" || r1.value === "despues") puntaje_relajado++;
    if (r3.value === "tranquilo" || r3.value === "silencio") puntaje_relajado++;
    if (r4.value === "ambiente") puntaje_relajado++;
    if (r5.value === "agua" || r5.value === "cafe") puntaje_relajado++;

    // PERFIL 2 — Práctico Directo
    if (r2.value === "hamburguesa" || r2.value === "sandwich") puntaje_practico++;
    if (r3.value === "gente") puntaje_practico++;
    if (r6.value === "nunca" || r6.value === "poco") puntaje_practico++;

    // PERFIL 3 — Explorador de Sabores
    if (r6.value === "siempre" || r6.value === "aveces") puntaje_explorador++;
    if (r3.value === "musica") puntaje_explorador++;
    if (r2.value === "pizza") puntaje_explorador++;

    // PERFIL 4 — Fan del Lugar
    if (r4.value === "noche" || r4.value === "comodidad") puntaje_fan++;
    if (r1.value === "6-7pm") puntaje_fan++;
    if (r5.value === "refresco") puntaje_fan++;

    const max = Math.max(
        puntaje_relajado,
        puntaje_practico,
        puntaje_explorador,
        puntaje_fan
    );

    let perfil = "";
    let descripcion = "";
    let extra = "";

    if (max === puntaje_relajado) {
        perfil = "Relajado Nocturno";
        descripcion = "Disfrutas un ambiente tranquilo y vienes a comer sin apuro.";
        extra = "Prueba algo ligero con café o agua.";
    } else if (max === puntaje_practico) {
        perfil = "Práctico Directo";
        descripcion = "Sabes lo que quieres y vas directo al punto.";
        extra = "Pizza o hamburguesa con refresco.";
    } else if (max === puntaje_explorador) {
        perfil = "Explorador de Sabores";
        descripcion = "Te encanta variar y probar cosas nuevas.";
        extra = "Te recomiendo el especial del día.";
    } else if (max === puntaje_fan) {
        perfil = "Fan del Lugar";
        descripcion = "Vienes por la vibra, la comodidad y el ambiente.";
        extra = "Tu clásico favorito nunca falla.";
    }

    const data = { nick, perfil, descripcion, extra };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    renderResultado(data);
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        renderResultado(JSON.parse(saved));
    } else {
        const form = document.getElementById("testForm");
        if (form) {
            form.addEventListener("submit", handleSubmit);
        }
    }
});
