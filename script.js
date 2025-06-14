const socket = io();
let username = '';
let room = '';

// Join form
document.getElementById('joinBtn').addEventListener('click', () => {
  username = document.getElementById('username').value.trim();
  room = document.getElementById('room').value.trim();

  if (username && room) {
    document.getElementById('joinForm').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('roomName').innerText = room;

    socket.emit('joinRoom', { username, room });
  }
});

// Chat messages
document.getElementById('messageForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('messageInput').value.trim();
  if (msg) {
    socket.emit('chatMessage', msg);
    document.getElementById('messageInput').value = '';
  }
});

socket.on('chatMessage', ({ username, message, time }) => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${username}</strong>: ${message}<span class="timestamp">${time}</span>`;
  document.getElementById('messages').appendChild(li);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});

// Emoji picker
const picker = new EmojiButton();
picker.on('emoji', emoji => {
  const input = document.getElementById('messageInput');
  input.value += emoji;
});
document.getElementById('emojiBtn').addEventListener('click', () => {
  picker.togglePicker(document.getElementById('emojiBtn'));
});
