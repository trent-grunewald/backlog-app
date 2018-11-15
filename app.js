const form = document.getElementById('registrar');
const input = form.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = input.value;
  const ul = document.getElementById('invitedList');
  const li = document.createElement('li');
  li.textContent = inputText;
  ul.appendChild(li);
  input.value = '';
})