document.addEventListener('DOMContentLoaded', () => {
  const mainDiv = document.querySelector('.main');
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  const ul = document.getElementById('invitedList');
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  const media = document.querySelectorAll('.mediaType');
  const namesArray = [];
  let spanOldText = '';


  // returns array from storage
  function loadData() {
    const itemsString = localStorage.getItem('storage');
    if(itemsString) {
      return JSON.parse(itemsString);
    } else {
      return [];
    }
  }

  const  mediaArray= function() {
    for(var i=0; i<media.length; i++) {
        if( media[i].checked ) {
            return false;
        }
    }
    return true;
};

  // add item text (string) to array and calls saveData (to storage)
  function addItem(item) {
    namesArray.push(item);
    saveData(namesArray);
  }

  // add edited item text (string) to same index at array and calls saveData (to storage)
    function addEditItem(item) {
      const findItemIndex = arrSearch(namesArray, spanOldText);
      namesArray.splice(findItemIndex, 1, item);
      saveData(namesArray);
    }

  // remove item from array and calls saveData (to storage)
  function removeItem (spanOldText) {
    const indexSpanOldText = namesArray.indexOf(spanOldText);
    if (indexSpanOldText > -1) {
      namesArray.splice(indexSpanOldText, 1);
    }
    saveData(namesArray);
  }
  
  // saves array to storage
  function saveData(array) {
    localStorage.setItem('storage', JSON.stringify(array));
  }

  // search array for item
  function arrSearch(array, item) {
    return array.indexOf(item);
  }
  
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
  
    for(let i = 0; i < media.length; i++){
      let mediaType = media[i];
      if(mediaType.checked === true){
        appendTo('label', 'textContent', mediaType.value)
      }
    }
  
    appendTo('button', 'textContent', 'Edit' );
  
    appendTo('button', 'textContent', 'Remove');
    
    return li;
  }



  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = input.value;
    const li = createLI(inputText);
    let duplicateName = false;

    if (inputText != '' && input.value != 'Please enter a valid name') { 
      
        for (i = 0; i < ul.children.length; i ++) {
            if (inputText == ul.children[i].children[0].textContent) {
              duplicateName === true;
            input.value = "This person has already been invited";
            return
            }
        }
        for(let i = 0; i < media.length; i++){
          if(mediaArray()){
            input.value = "Please select a media type"
            return
          }
        }
            if (duplicateName != true) {
              input.value = '';
              ul.appendChild(li);
              addItem(inputText)
            }
       } else {
        input.value = "Please enter a valid title";
    }
});

window.onload = function() {
  //  function getItems() {
      const startItems = loadData();     
      for(let i = 0; i < startItems.length; i++) {
        addItem(startItems[i]);
        // namesArray.push(startItems[i]);
        const li = createLI(startItems[i]);
        ul.appendChild(li);
      }
  //  }
  //  getItems();
  }


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
      const li = button.parentNode;
      const ul = li.parentNode;
      const span = li.firstElementChild;
      const input = document.createElement('input');
      const edit = document.createElement('span');
      const nameActions = {
        Remove:  () => {
          ul.removeChild(li);
          removeItem(span.textContent);
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
          addEditItem(edit.textContent)
        }
      };
  
  
      const action = button.textContent;
      nameActions[action]();
  
      }
    });

    
  });