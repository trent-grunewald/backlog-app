const mainDiv = document.querySelector('.main');
const form = document.getElementById('registrar');
const input = form.querySelector('input');
const ul = document.getElementById('invitedList');
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');
const header = document.querySelector('header');
const p = document.createElement('p');

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
  function createElement(elementName, property, value){
    const element = document.createElement(elementName);
    element[property] = value;
    return element
  }

  function appendTo(elementName, property, value){
    const element = createElement(elementName, property, value)
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');
  appendTo('span', 'textContent', text);

  appendTo('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));

  appendTo('button', 'textContent', 'Edit' );

  appendTo('button', 'textContent', 'Remove');
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = input.value;
  if(inputText === '' || inputText === "Please enter a valid name"){
    input.value = "Please enter a valid name";
    header.insertBefore(p, form);
  } else {
  input.value = '';
  const li = createLI(inputText);
  ul.appendChild(li);
  }
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
    const nameActions = {
      Remove:  () => {
        ul.removeChild(li);
      },
      Edit: () => {
        button.textContent = "Save";
        input.type = 'text';
        li.insertBefore(input, span);
        li.removeChild(span);
        input.value = span.textContent;
      }, 
      Save: () => {
        button.textContent = "Edit";
        span.textContent = input.textContent;
        li.insertBefore(edit, span);
        li.removeChild(span);
        edit.textContent = span.value;
      }
    };


    const action = button.textContent;
    nameActions[action]();

    }
  });