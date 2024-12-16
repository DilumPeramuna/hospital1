const oform = document.getElementById('form1');
const Table1 = document.getElementById('oTable').querySelector('tbody');
const tPrice = document.getElementById('totalPrice');
const addToFavouritesButton = document.getElementById('addToFavourites');
const applyFavouritesButton = document.getElementById('applyFavourites');
const buyNowButton = document.getElementById('buyNow');

let order = [];
let total = 0;

function updateTable() {
  Table1.innerHTML = '';
  total = 0;

  order.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    `;
    Table1.appendChild(row);
    total += item.price;
  });

  tPrice.textContent = total.toFixed(2);
}

oform.addEventListener('change', (event) => {
  const inputs = oform.querySelectorAll('input[type="number"]');
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
  const inputs = oform.querySelectorAll('input[type="number"]');

  const updatedOrder = [...order];

  favouriteOrder.forEach(fav => {
    const existingItemIndex = updatedOrder.findIndex(item => item.name === fav.name);
    if (existingItemIndex !== -1) {
      updatedOrder[existingItemIndex].quantity += fav.quantity;
      updatedOrder[existingItemIndex].price += fav.price;
    } else {
      updatedOrder.push(fav);
    }
  });

  order = updatedOrder;
  updateTable();
});


buyNowButton.addEventListener('click', () => {
  localStorage.setItem('currentOrder', JSON.stringify(order));
  window.location.href = 'checkout.html';
});
