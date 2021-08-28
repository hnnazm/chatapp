// Elements selector
const messages = document.querySelector('#messages')
const form = document.querySelector('#form')

const socket = io();

// Client join room
socket.emit('join')

// Confirm message sent and output to DOM
socket.on('receiveMessage', (data) => {
    console.log(data)
    outputMessage(data)
})

// Message submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(e)

    // Get message text
    let data = e.target.elements.input.value;

    data = data.trim();
    console.log(data)

    if (!data) {
        return false;
    }

    // Emit message to server
    socket.emit('newMessage', data);

    // Clear input
    e.target.elements.input.value = '';
    e.target.elements.input.focus();
});

// Output message to DOM
function outputMessage(data) {
    const li = document.createElement('li')
    li.innerText = data
    messages.appendChild(li)
}