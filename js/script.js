const form = document.getElementById('orderForm');
const orderTable = document.getElementById('orderTable').querySelector('tbody');
const totalPriceElement = document.getElementById('totalPrice');
const addToFavouritesButton = document.getElementById('addToFavourites');
const applyFavouritesButton = document.getElementById('applyFavourites');
const buyNowButton = document.getElementById('buyNow');

let order = [];
let total = 0;

function updateTable() {
  orderTable.innerHTML = '';
  total = 0;

  order.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    `;
    orderTable.appendChild(row);
    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);
}

form.addEventListener('change', (event) => {
  const inputs = form.querySelectorAll('input[type="number"]');
  order = [];

  inputs.forEach(input => {
    const quantity = parseInt(input.value) || 0;
    if (quantity > 0) {
      const name = input.dataset.name;
      const price = parseFloat(input.dataset.price) * quantity;
      alert('added to the cart!');
      order.push({ name, quantity, price });
    }
  });

  updateTable();
  
});

addToFavouritesButton.addEventListener('click', () => {
  localStorage.setItem('favouriteOrder', JSON.stringify(order));
  alert('Order saved as favourite!');
});

applyFavouritesButton.addEventListener('click', () => {
  const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder')) || [];
  const inputs = form.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
    const item = favouriteOrder.find(fav => fav.name === input.dataset.name);
    input.value = item ? item.quantity : '';
  });

  order = favouriteOrder;
  updateTable();
});

buyNowButton.addEventListener('click', () => {
  localStorage.setItem('currentOrder', JSON.stringify(order));
  window.location.href = 'checkout.html';
});
