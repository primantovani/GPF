async function loadGames() {
  try {
    // Faz a solicitação para o JSON
    const response = await fetch("../assets/games/adventure.json");
    
    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Converte a resposta em JSON
    const games = await response.json();

    // Seleciona os carrosséis e o loader
    const carousel1 = document.querySelector("#hig-offers-carousel-1 .carousel");
    const carousel2 = document.querySelector("#hig-offers-carousel-2 .carousel");
    const carousel3 = document.querySelector("#hig-offers-carousel-3 .carousel");
    const loader = document.querySelector("#hig-offers .loader");

    // Verifica se os elementos necessários foram encontrados
    if (carousel1 && carousel2 && carousel3 && loader) {
      // Mostra os carrosséis e esconde o loader
      carousel1.classList.remove("hidden");
      carousel2.classList.remove("hidden");
      carousel3.classList.remove("hidden");
      loader.classList.add("hidden");
    } else {
      console.error('Elementos para carrosséis ou loader não encontrados.');
    }

    // Limpa o conteúdo atual dos carrosséis
    carousel1.innerHTML = '';
    carousel2.innerHTML = '';
    carousel3.innerHTML = '';

    // Adiciona jogos ao primeiro carrossel
    const higOffersGames1 = games.slice(33, 50);
    for (const game of higOffersGames1) {
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
        carousel1.append(gameEl);
      }
    }

    // Adiciona jogos ao segundo carrossel
    const higOffersGames2 = games.slice(11, 50);
    for (const game of higOffersGames2) {
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
        carousel2.append(gameEl);
      }
    }

    // Adiciona jogos ao terceiro carrossel
    const higOffersGames3 = games.slice(22,50);
    for (const game of higOffersGames3) {
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
  } catch (error) {
    console.error('Erro ao carregar os jogos:', error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadGames();
});
