// Carrossel simples para a seção de projetos

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  // Define quantos projetos aparecem por vez (1 no mobile, 2 no desktop)
  function getVisibleCards() {
    return window.innerWidth < 700 ? 1 : 2;
  }

  let currentIndex = 0;

  function updateCarousel() {
    const visible = getVisibleCards();
    const cardWidth = cards[0].offsetWidth + 24; // 24px é o gap do grid
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    // Desabilita botões se estiver no início/fim
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visible;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCards();
    if (currentIndex < cards.length - visible) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Atualiza ao redimensionar a tela
  window.addEventListener('resize', updateCarousel);

  // Inicializa o carrossel
  updateCarousel();