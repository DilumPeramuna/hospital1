const orderSummaryTable = document.getElementById('orderSummary').querySelector('tbody');
const totalAmountElement = document.getElementById('totalAmount');
const checkoutForm = document.getElementById('checkoutForm');

document.addEventListener('DOMContentLoaded', () => {
  const order = JSON.parse(localStorage.getItem('favouriteOrder')) || [];
  let total = 0;

  order.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    `;
    orderSummaryTable.appendChild(row);
    total += item.price;
  });

  totalAmountElement.textContent = total.toFixed(2);
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value; 
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const postalCode = document.getElementById('postalCode').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;

  if (name && email && address && city && postalCode && cardNumber && expiryDate && cvv) {
    alert(`Thank you for your purchase, ${name}! Your order will be delivered within 3-5 business days.`);
    localStorage.removeItem('favouriteOrder');
    window.location.href = 'order.html'; 
  } else {
    alert('Please fill in all the fields correctly.');
  }
});
