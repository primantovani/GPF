import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import fs from "fs/promises";

(async () => {
  // Inicializando puppeteer
  const browser = await puppeteer.launch({ headless: false });

  const numeroDeJogos = 1000;
  const categoria = "adventure";

  const finalGames: any[] = [];

  let deveContinuarABuscar = true;

  // array de 0 até numerodeJogos/12
  const sequenciaDeBusca = Array.from(
    { length: Math.ceil(numeroDeJogos / 12) },
    (_, i) => i
  );

  // chunk de sequencia para buscar de 3 em 3
  const sequenciaDeBuscaChunk = Array.from(
    { length: Math.ceil(sequenciaDeBusca.length / 3) },
    (_, i) => sequenciaDeBusca.slice(i * 3, i * 3 + 3)
  );

  for (const chunk of sequenciaDeBuscaChunk) {
    await Promise.all(
      chunk.map(async (i) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 1080, height: 1024 });
        await page.goto(
          `https://store.steampowered.com/category/${categoria}?offset=${
            i * 12
          }`
        );
        // Aguarda carregar o conteudo de sale
        await page.waitForSelector(".ContentHubMainCarouselCapsule");

        // Scroll até o conteudo
        await page.evaluate(() => {
          document.querySelector(".sale_item_browser")?.scrollIntoView();
        });

        // espera carregar o card do jogo
        await page.waitForSelector(
          ".sale_item_browser .ImpressionTrackedElement"
        );

        // Injeta JS pra caputrar HTML dos elementos
        const gamesHTML = await page.evaluate(() => {
          const elements = document.querySelectorAll(
            ".sale_item_browser .ImpressionTrackedElement"
          );
          const html = Array.from(elements).map((element) => element.outerHTML);
          return `<div class="all-games">${html.join("")}</div>`;
        });
        // adiciona todos os jogos numa div pra ser consultado

        const gamesElements = cheerio.load(gamesHTML);

        gamesElements(".ImpressionTrackedElement").each((i, el) => {
          const game = gamesElements(el);
          const img = game.find(".CapsuleImageCtn img").attr("src");
          const name = game.find(".StoreSaleWidgetTitle").text();
          const prices = game.find(".StoreSalePriceWidgetContainer > div");
          const haveTagsOnPrice = prices.length > 1;
          let haveDiscount = false;
          let discountAmount = "0%";
          let originalPrice = "0";
          if (haveTagsOnPrice) {
            const possibleDisccountTag = gamesElements(
              prices[prices.length > 2 ? 1 : 0]
            ).text();
            if (possibleDisccountTag.includes("%")) {
              haveDiscount = true;
              discountAmount = possibleDisccountTag;
              originalPrice =
                gamesElements(prices[prices.length > 2 ? 2 : 1])
                  .text()
                  ?.split("R$")[1] || "0";
            } else {
              originalPrice =
                gamesElements(prices[1]).text()?.split("R$")[1] || "0";
            }
          } else {
            originalPrice =
              gamesElements(prices[0]).text()?.split("R$")[1] || "0";
          }

          const parsedOriginalPrice = Number(originalPrice.replace(",", "."));
          const priceWithDiscount = (
            parsedOriginalPrice +
            (Number(discountAmount.replace("%", "")) * parsedOriginalPrice) /
              100
          )
            .toString()
            ?.match(/^-?\d+(?:\.\d{0,2})?/)?.[0];
          //find categories with class .WidgetTag and map them to text
          const categories: string[] = [];
          gamesElements(el)
            .find(".WidgetTag")
            .each((i, el2) => {
              categories.push(gamesElements(el2).text());
            });

          finalGames.push({
            img,
            name,
            categories,
            originalPrice,
            haveDiscount,
            discountAmount,
            priceWithDiscount,
          });
        });
        await page.close();
      })
    );
  }

  await fs.mkdir(`./final_outputs/steam/${categoria}`, { recursive: true });
  await fs.writeFile(
    `./final_outputs/steam/${categoria}.json`,
    JSON.stringify(finalGames)
  );
  await browser.close();
})();
