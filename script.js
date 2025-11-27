// ================================
// CARREGAR CAPÍTULOS DO JSON
// ================================

let capitulos = [];

fetch("capitulos.json")
  .then(res => res.json())
  .then(data => {
    capitulos = data;
  })
  .catch(err => console.error("Erro ao carregar capítulos:", err));

// ================================
// CARROSSEL
// ================================

const track = document.getElementById("carouselTrack");
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");
let index = 0;

function updateCarousel() {
  const itemWidth = track.children[0].offsetWidth + 20; // largura + gap
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

btnRight.addEventListener("click", () => {
  if (index < track.children.length - 1) {
    index++;
    updateCarousel();
  }
});

btnLeft.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// ================================
// EXPANDIR CAPÍTULO AO CLICAR
// ================================

const boxConteudo = document.getElementById("capituloConteudo");

track.addEventListener("click", (e) => {
  const item = e.target.closest(".carousel-item");
  if (!item) return;

  const id = item.getAttribute("data-id");
  const cap = capitulos.find(c => c.id === id);
  if (!cap) return;

  boxConteudo.style.display = "block";
  boxConteudo.innerHTML = `
    <h3>${cap.titulo}</h3>
    <p>${cap.conteudo}</p>
    <p class="muted" style="margin-top:10px">Duração estimada: ${cap.duracao}</p>
  `;

  // boxConteudo.scrollIntoView({ behavior: "smooth" });
});

// ================================
// TEMA (DARK/LIGHT)
// ================================

const toggleTheme = document.getElementById("toggleTheme");
let dark = false;

if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    dark = !dark;
    document.body.classList.toggle("dark", dark);
  });
}

// ================================
// FORMULÁRIO DE CONTATO
// ================================

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Mensagem enviada com sucesso!";
    form.reset();
  });
}
