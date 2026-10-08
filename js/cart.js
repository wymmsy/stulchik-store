const CART_STORAGE_KEY = "cart";

const cartToggle = document.getElementById("cartToggle");
const cartPanel = document.getElementById("cartPanel");
const cartClose = document.getElementById("cartClose");
const overlay = document.getElementById("overlay");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotalValue = document.getElementById("cartTotalValue");
const productGrid = document.getElementById("productGrid");

function loadCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addToCart(id) {
  const item = cart.find((cartItem) => cartItem.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
  saveCart();
  renderCart();
}

function changeQuantity(id, delta) {
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return;
  }

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}

function getCartTotal() {
  return cart.reduce((total, cartItem) => {
    const product = getProductById(cartItem.id);
    return product ? total + product.price * cartItem.quantity : total;
  }, 0);
}

function getCartCount() {
  return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
}

function createCartItem(cartItem) {
  const product = getProductById(cartItem.id);

  const li = document.createElement("li");
  li.className = "cart-item";
  li.dataset.id = cartItem.id;

  if (!product) {
    return li;
  }

  const img = document.createElement("img");
  img.className = "cart-item__image";
  img.src = product.image;
  img.alt = product.name;
  img.width = 56;
  img.height = 56;

  const info = document.createElement("div");
  info.className = "cart-item__info";

  const title = document.createElement("p");
  title.className = "cart-item__title";
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "cart-item__price";
  price.textContent = `${product.price} ₽`;

  info.append(title, price);

  const quantity = document.createElement("div");
  quantity.className = "cart-item__quantity";

  const decrease = document.createElement("button");
  decrease.type = "button";
  decrease.className = "cart-item__decrease";
  decrease.setAttribute("aria-label", "Уменьшить количество");
  decrease.textContent = "−";

  const count = document.createElement("span");
  count.className = "cart-item__count";
  count.textContent = cartItem.quantity;

  const increase = document.createElement("button");
  increase.type = "button";
  increase.className = "cart-item__increase";
  increase.setAttribute("aria-label", "Увеличить количество");
  increase.textContent = "+";

  quantity.append(decrease, count, increase);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "cart-item__remove";
  remove.setAttribute("aria-label", "Удалить товар");
  remove.textContent = "×";

  li.append(img, info, quantity, remove);

  return li;
}

function renderCart() {
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }

  cart.forEach((cartItem) => {
    cartList.append(createCartItem(cartItem));
  });

  cartCount.textContent = getCartCount();
  cartTotalValue.textContent = `${getCartTotal()} ₽`;
}

function openCart() {
  cartPanel.hidden = false;
  overlay.hidden = false;
}

function closeCart() {
  cartPanel.hidden = true;
  overlay.hidden = true;
}

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".product-card__add");

  if (!button) {
    return;
  }

  addToCart(Number(button.dataset.id));
});

cartList.addEventListener("click", (event) => {
  const item = event.target.closest(".cart-item");

  if (!item) {
    return;
  }

  const id = Number(item.dataset.id);

  if (event.target.closest(".cart-item__increase")) {
    changeQuantity(id, 1);
  } else if (event.target.closest(".cart-item__decrease")) {
    changeQuantity(id, -1);
  } else if (event.target.closest(".cart-item__remove")) {
    removeFromCart(id);
  }
});

renderCart();
