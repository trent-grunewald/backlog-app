document.addEventListener('DOMContentLoaded', () => {
    const mainDiv = document.querySelector('.main');
    const form = document.getElementById('registrar');
    const input = form.querySelector('input');
    const ul = document.getElementById('invitedList');
    const div = document.createElement('div');
    const movieLabel = document.createElement('div');
    const movieFilter = document.createElement('input')
    const gameLabel = document.createElement('div');
    const gameFilter = document.createElement('input')
    const bookLabel = document.createElement('div');
    const bookFilter = document.createElement('input');
    const media = document.querySelectorAll('.mediaType');

    const  mediaArray= function() {
      for(var i=0; i<media.length; i++) {
          if( media[i].checked ) {
              return false;
          }
      }
      return true;
  };
    
    movieLabel.textContent = "Movies Only";
    movieLabel.appendChild(movieFilter);
    movieFilter.classList = "movieFilter";
    movieFilter.type = "checkBox";
    movieFilter.name = "type";
    gameLabel.textContent = "Games Only";
    gameLabel.appendChild(gameFilter);
    gameFilter.classList = "gameFilter";
    gameFilter.type = "checkBox";
    gameFilter.name = "type";
    bookLabel.textContent = "Books Only";
    bookLabel.appendChild(bookFilter);
    bookFilter.classList = "bookFilter";
    bookFilter.type = "checkBox";
    bookFilter.name = "type";
    div.appendChild(movieLabel);
    div.appendChild(gameLabel);
    div.appendChild(bookLabel);
    mainDiv.insertBefore(div, ul);
    
    
    
    movieFilter.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const lis = ul.children;
      if(isChecked){
        for(let i = 0; i<lis.length; i++){
          let li = lis[i];
          if(li.classList == 'Movie'){
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

    gameFilter.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const lis = ul.children;
      if(isChecked){
        for(let i = 0; i<lis.length; i++){
          let li = lis[i];
          if(li.classList == 'Game'){
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

    bookFilter.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const lis = ul.children;
      if(isChecked){
        for(let i = 0; i<lis.length; i++){
          let li = lis[i];
          if(li.classList == 'Book'){
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
          li.classList = mediaType.value;
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
              }
         } else {
          input.value = "Please enter a valid name";
      }
  });
  

  
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
            localStorage.removeItem(span);
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
            addEditItem(edit.textContent)
          }
        };
    
    
        const action = button.textContent;
        nameActions[action]();
    
        }
      });
  
      
    });