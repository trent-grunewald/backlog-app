const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');

function createLI(text) {
  const li = document.createElement('li');
  li.textContent = text;
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
  const checkBox = document.createElement('input');
  checkBox.type = 'checkBox';
  label.appendChild(checkBox);
  li.appendChild(label);
  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  li.appendChild(removeButton);
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = input.value;
  input.value = '';
  const li = createLI(inputText);
  ul.appendChild(li);
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

ul.addEventListener('click', (e) => {
  if (e.target.textContent === 'Remove'){
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
})