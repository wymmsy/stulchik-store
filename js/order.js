const checkoutBtn = document.getElementById("checkoutBtn");
const orderModal = document.getElementById("orderModal");
const orderForm = document.getElementById("orderForm");
const orderSuccess = document.getElementById("orderSuccess");
const orderCancel = document.getElementById("orderCancel");

checkoutBtn.addEventListener("click", () => {
  closeCart();
  orderModal.showModal();
});

orderCancel.addEventListener("click", () => {
  orderModal.close();
});

orderModal.addEventListener("click", (event) => {
  if (event.target === orderModal) {
    orderModal.close();
  }
});

orderModal.addEventListener("close", () => {
  orderForm.reset();
  orderSuccess.hidden = true;
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  cart = [];
  saveCart();
  renderCart();

  orderSuccess.hidden = false;

  setTimeout(() => {
    orderModal.close();
  }, 1500);
});
