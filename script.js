// ======================================================
// GARANTIR QUE O JS SÓ RODA DEPOIS DO HTML CARREGAR
// ======================================================
document.addEventListener("DOMContentLoaded", function () {

  // ======================================================
  // CARREGAR CAPÍTULOS DO JSON
  // ======================================================
  let capitulos = [];

  fetch("capitulos.json")
    .then(res => res.json())
    .then(data => {
      capitulos = data; // salvamos o JSON carregado
    })
    .catch(err => console.error("Erro ao carregar capítulos:", err));


  // ======================================================
  // CARROSSEL
  // ======================================================
  const track = document.getElementById("carouselTrack");
  const btnLeft = document.querySelector(".carousel-btn.left");
  const btnRight = document.querySelector(".carousel-btn.right");
  let index = 0;

  // Função que atualiza o movimento do carrossel
  function updateCarousel() {
    const firstItem = track.children[0];
    if (!firstItem) return;

    // pegar largura real do item + gap
    const itemWidth = firstItem.offsetWidth + 20;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  // Garantir que as imagens carregaram ANTES de medir o tamanho
  const imgs = track.querySelectorAll("img");
  let loaded = 0;

  imgs.forEach(img => {
    img.onload = () => {
      loaded++;
      if (loaded === imgs.length) {
        updateCarousel(); // agora sim a largura está correta
      }
    };
  });

  // Botão direita
  btnRight.addEventListener("click", () => {
    if (index < track.children.length - 1) {
      index++;
      updateCarousel();
    }
  });

  // Botão esquerda
  btnLeft.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });


  // ======================================================
  // EXPANDIR CAPÍTULO AO CLICAR
  // ======================================================
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
  });


  // ======================================================
  // TEMA (DARK/LIGHT)
  // ======================================================
  const toggleTheme = document.getElementById("toggleTheme");
  let dark = false;

  toggleTheme.addEventListener("click", () => {
    dark = !dark;
    document.body.classList.toggle("dark", dark);
  });


  // ======================================================
  // FORMULÁRIO DE CONTATO
  // ======================================================
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = "Mensagem enviada com sucesso!";
    form.reset();
  });

});
