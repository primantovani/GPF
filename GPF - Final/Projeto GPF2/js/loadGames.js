// carregar jogos
async function loadGames() {
  const games = await (await fetch("../assets/games/adventure.json")).json();

  const bestOffers = document.querySelector("#best-offers");
  const bestOffersCarousel = bestOffers.querySelector(".carousel");

  const weekPromotions = document.querySelector("#week-promotions");
  const weekPromotionsCarousel = weekPromotions.querySelector(".carousel");

  const teamChoices = document.querySelector("#team-choices");
  const teamChoicesCaroulse = teamChoices.querySelector(".carousel");

  const loader = bestOffers.querySelector(".loader");
  bestOffersCarousel.classList.remove("hidden");
  loader.classList.add("hidden");
  const bestOffersGames = games.slice(0, 50);
  for (const game of bestOffersGames) {
    if (game.priceWithDiscount != "0") {
      const gameEl = document.createElement("a");
      gameEl.href = "./descricao-jogo.html?name=" + game.name;
      gameEl.innerHTML = `
          <div class="img-container">
            <img src="${game.img}" alt="img 1" />
          </div>
          <div class="info">
            <p class="name">${game.name}</p>
            <p class="price">${
              game.discountAmount != "0%"
                ? `<span class="discount">${game.discountAmount}</span> <s class="original-price">R$ ${game.originalPrice}</s>`
                : ""
            }R$ ${game.priceWithDiscount}</p>
          </div>
  
              `;
      bestOffersCarousel.append(gameEl);
    }
  }

  const loaderWeekPromos = weekPromotions.querySelector(".loader");
  weekPromotionsCarousel.classList.remove("hidden");
  loaderWeekPromos.classList.add("hidden");
  const weekPromotionsGames = games.slice(50, 100);
  for (const game of weekPromotionsGames) {
    if (game.priceWithDiscount != "0") {
      const gameEl = document.createElement("a");
      gameEl.href = "./descricao-jogo.html?name=" + game.name;
      gameEl.innerHTML = `
          <div class="img-container">
            <img src="${game.img}" alt="img 1" />
          </div>
          <div class="info">
            <p class="name">${game.name}</p>
            <p class="price">${
              game.discountAmount != "0%"
                ? `<span class="discount">${game.discountAmount}</span> <s class="original-price">R$ ${game.originalPrice}</s>`
                : ""
            }R$ ${game.priceWithDiscount}</p>
          </div>
  
              `;
      weekPromotionsCarousel.append(gameEl);
    }
  }

  const loaderTeamChoices = teamChoices.querySelector(".loader");
  teamChoicesCaroulse.classList.remove("hidden");
  loaderTeamChoices.classList.add("hidden");
  const teamChoicesGames = games.slice(100, 150);

  for (const game of teamChoicesGames) {
    if (game.priceWithDiscount != "0") {
      const gameEl = document.createElement("a");
      gameEl.href = "./descricao-jogo.html?name=" + game.name;
      gameEl.innerHTML = `
          <div class="img-container">
            <img src="${game.img}" alt="img 1" />
          </div>
          <div class="info">
            <p class="name">${game.name}</p>
            <p class="price">${
              game.discountAmount != "0%"
                ? `<span class="discount">${game.discountAmount}</span> <s class="original-price">R$ ${game.originalPrice}</s>`
                : ""
            }R$ ${game.priceWithDiscount}</p>
          </div>
  
              `;
      teamChoicesCaroulse.append(gameEl);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadGames();
});
