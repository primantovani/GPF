// Carregar jogos
async function loadGame() {
  try {
    const games = await (await fetch("../assets/games/adventure.json")).json();
    const params = new URLSearchParams(window.location.search);
    const game = games.find((g) => g.name === params.get("name"));

    if (game) {
      // Atualizar imagem e descrição do jogo
      document.querySelector(".game-image img").src = game.img;
      document.querySelector(".game-description h2").textContent = game.name;

      // Criar e adicionar preço
      const price = document.createElement("div");
      price.classList.add("price");
      price.innerHTML = `
        <p>
          <span class="price-icon">🛒</span> R$${game.priceWithDiscount}
          <a href="#${game.link}" class="buy-button">Comprar</a>
        </p>
      `;
      document.querySelector(".prices-container").append(price);
    } else {
      console.warn("Jogo não encontrado.");
    }

    // Adicionar jogos ao terceiro carrossel
    const carousel3 = document.querySelector("#hig-offers-carousel-4 .carousel");
    if (carousel3) {
      const highOffersGames3 = games.slice(22, 50);
      for (const game of highOffersGames3) {
        if (game.priceWithDiscount !== "0") {
          const gameEl = document.createElement("a");
          gameEl.href = `./descricao-jogo.html?name=${encodeURIComponent(game.name)}`;
          gameEl.innerHTML = `
            <div class="img-container">
              <img src="${game.img}" alt="${game.name}" />
            </div>
            <div class="info">
              <p class="name">${game.name}</p>
              <p class="price">
                ${
                  game.discountAmount !== "0%" 
                    ? `<span class="discount">${game.discountAmount}</span> <s class="original-price">R$ ${game.originalPrice}</s>` 
                    : ""
                }
                R$ ${game.priceWithDiscount}
              </p>
            </div>
          `;
          carousel3.append(gameEl);
        }
      }
    } else {
      console.warn("Carrossel não encontrado.");
    }
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadGame();
});
