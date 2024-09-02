// carregar jogos
async function loadGame() {
  const games = await (await fetch("../assets/games/adventure.json")).json();
  const params = new URLSearchParams(window.location.search);
  const game = games.find((g) => g.name === params.get("name"));
  document.querySelector(".game-image img").src = game.img;
  document.querySelector(".game-description h2").textContent = game.name;
  const price = document.createElement("div");
  price.classList.add("price");
  price.innerHTML = `
    <p>
        <span class="price-icon">🛒</span> R$${game.priceWithDiscount}
        <a href="#${game.link}" class="buy-button">Comprar</a>
    </p>
  `;

  document.querySelector(".prices-container").append(price);

  // const bestOffers = document.querySelector("#best-offers");
  // const carousel = bestOffers.querySelector(".carousel");
  // const loader = bestOffers.querySelector(".loader");
  // carousel.classList.remove("hidden");
  // loader.classList.add("hidden");
  // for (const game of games) {
  //   if (game.priceWithDiscount != "0") {
  //     const gameEl = document.createElement("a");
  //     gameEl.href = "./descricao-jogo.html?name=" + game.name;
  //     gameEl.innerHTML = `
  //         <div class="img-container">
  //           <img src="${game.img}" alt="img 1" />
  //         </div>
  //         <div class="info">
  //           <p class="name">${game.name}</p>
  //           <p class="price">${
  //             game.discountAmount != "0%"
  //               ? `<span class="discount">${game.discountAmount}</span> <s class="original-price">R$ ${game.originalPrice}</s>`
  //               : ""
  //           }R$ ${game.priceWithDiscount}</p>
  //         </div>

  //             `;
  //     carousel.append(gameEl);
  //   }
  // }
}

document.addEventListener("DOMContentLoaded", function () {
  loadGame();
});
