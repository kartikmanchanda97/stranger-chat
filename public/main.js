const socket = io();

const form = document.querySelector('form');


form.addEventListener('submit', (e) => {
   e.preventDefault();

   const msg = e.target.elements.msg.value;

   socket.emit('chatMessage', msg);

   e.target.reset();
});

const path = window.location.pathname;

if (path.includes('chat')) {
   const name = window.location.search.slice(6);

   socket.emit('user-name', name);
}   

socket.on('message', obj => {
	outputMessage(obj);
});


function outputMessage(obj) {
   const container = document.querySelector('.chatContainer');

   const d = new Date();
   
   const div = document.createElement('div');
   div.classList.add('rounded');
   div.style.background = '#45B39D';
   div.innerHTML = `
     <div class="d-flex justify-content-between p-1" >
        <p>${obj.name}</p>
        <p id="time">${d.getHours()}:${d.getMinutes()}</p>
      </div>
      <p class="pl-1">${obj.msg}</p>
   `
  container.appendChild(div);
}

socket.on('broadcast', name => {
   const container = document.querySelector('.chatContainer');
   
   const div = document.createElement('div');

   div.classList.add('rounded');
   div.style.background = '#45B39D';
   div.innerHTML = `
    <div class="p-2 text-center my-2" >${name} has joined the chat</div>
   `

   container.appendChild(div);
})

socket.on('disconnect-message', name => {
   const container = document.querySelector('.chatContainer');
   
   const div = document.createElement('div');

   div.classList.add('rounded');
   div.style.background = '#45B39D';
   div.innerHTML = `
    <div class="p-2 text-center my-2" >${name} has left the chat</div>
   `

   container.appendChild(div);
});