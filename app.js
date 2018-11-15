const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const li = document.createElement('li');
  const inputText = input.value;
  const label = document.createElement('label');
  const checkBox = document.createElement('input');

  li.textContent = inputText;
  label.textContent = 'Confirmed';
  checkBox.type = 'checkBox';
  label.appendChild(checkBox);
  li.appendChild(label);
  ul.appendChild(li);
  input.value = '';
})

ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if(checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
})