const mainDiv = document.querySelector('.main');
const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide non-responders";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);

filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if(isChecked){
    for(let i = 0; i<lis.length; i++){
      let li = lis[i];
      if(li.className === 'responded'){
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for(let i = 0; i<lis.length; i++){
      let li = lis[i];
       li.style.display = '';
    }
  }
})

function createLI(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  const label = document.createElement('label');
  label.textContent = 'Confirmed';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkBox';
  label.appendChild(checkBox);
  li.appendChild(label);

  const editButton = document.createElement('button');
  editButton.textContent = "Edit";
  editButton.id = "editButton";
  li.appendChild(editButton);

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
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const span = li.firstElementChild;
    const input = document.createElement('input');
    const edit = document.createElement('span');

    if(button.textContent === 'Remove'){   
      ul.removeChild(li);
  }
    if (e.target.textContent === 'Edit') {
      button.textContent = "Save";
      input.type = 'text';
      li.insertBefore(input, span);
      li.removeChild(span);
      input.value = span.textContent;

  } else if (e.target.textContent === "Save") {
      button.textContent = "Edit";
      span.textContent = input.textContent;
      li.insertBefore(edit, span);
      li.removeChild(span);
      edit.textContent = span.value;
      }
    }
  });