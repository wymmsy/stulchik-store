function createProductCard(product) {
  const li = document.createElement("li");
  li.className = "product-card";

  const article = document.createElement("article");

  const img = document.createElement("img");
  img.className = "product-card__image";
  img.src = product.image;
  img.alt = product.name;
  img.width = 200;
  img.height = 200;

  const title = document.createElement("h2");
  title.className = "product-card__title";
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "product-card__price";
  price.textContent = `${product.price} ₽`;

  const addButton = document.createElement("button");
  addButton.className = "product-card__add";
  addButton.type = "button";
  addButton.textContent = "Добавить в корзину";
  addButton.dataset.id = product.id;

  article.append(img, title, price, addButton);
  li.append(article);

  return li;
}

function renderProducts(productList) {
  const grid = document.getElementById("productGrid");

  productList.forEach((product) => {
    grid.append(createProductCard(product));
  });
}

renderProducts(products);
