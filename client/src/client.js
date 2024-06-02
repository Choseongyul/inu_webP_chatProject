import io from 'socket.io-client';

async function initSocket() {
  const username = localStorage.getItem('username');
  if (username) {
    const socket = io.connect('http://localhost:3000', {
      query: { username }
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // 소켓 이벤트 처리
  } else {
    console.error('Username not found');
  }
}

initSocket();
