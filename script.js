const socket = new WebSocket('ws://172.0.0.1');
const infoDiv = document.getElementById('info');
let activeButtons = new Set();
let activeAnalog = '';

socket.onopen = () => console.log('Connected to ESP32');
socket.onmessage = (event) => console.log('Message from ESP32:', event.data);
socket.onerror = (error) => console.error('WebSocket error:', error);
socket.onclose = () => console.log('Disconnected from ESP32');

const buttonNameMap = {
    'L1': 'L1',
    'L2': 'L2',
    'R1': 'R1',
    'R2': 'R2',
    'Up': 'Atas (↑)',
    'Down': 'Bawah (↓)',
    'Left': 'Kiri (←)',
    'Right': 'Kanan (→)',
    'Triangle': 'Segitiga (△)',
    'Cross': 'Silang (✕)',
    'Square': 'Kotak (□)',
    'Start': 'Start',
    'PS': 'PS',
    'Select': 'Select',
};

function updateInfo() {
    let text = '';

    if (activeButtons.size > 0) {
        text += 'Menekan: ' + [...activeButtons].join(', ');
    }

    if (activeAnalog) {
        if (text.length > 0) text += ' | ';
        text += activeAnalog;
    }

    infoDiv.textContent = text;
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
        const buttonId = button.id;
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(`${buttonId}_PRESSED`);
        }
        activeButtons.add(buttonNameMap[buttonId] || buttonId);
        updateInfo();
    });

    button.addEventListener('touchend', () => {
        const buttonId = button.id;
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(`${buttonId}_RELEASED`);
        }
        activeButtons.delete(buttonNameMap[buttonId] || buttonId);
        updateInfo();
    });
});

const leftAnalog = nipplejs.create({
    zone: document.getElementById('analog-left'),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'white',
    size: 80
});

const rightAnalog = nipplejs.create({
    zone: document.getElementById('analog-right'),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'white',
    size: 80
});

leftAnalog.on('move', (evt, data) => {
    const x = (data.vector.x).toFixed(2);
    const y = (data.vector.y).toFixed(2);
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(`LEFT_ANALOG_X:${x},Y:${y}`);
    }
    activeAnalog = `Left Analog → X:${x}, Y:${y}`;
    updateInfo();
});

leftAnalog.on('end', () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send('LEFT_ANALOG_X:0,Y:0');
    }
    activeAnalog = '';
    updateInfo();
});

rightAnalog.on('move', (evt, data) => {
    const x = (data.vector.x).toFixed(2);
    const y = (data.vector.y).toFixed(2);
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(`RIGHT_ANALOG_X:${x},Y:${y}`);
    }
    activeAnalog = `Right Analog → X:${x}, Y:${y}`;
    updateInfo();
});

rightAnalog.on('end', () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send('RIGHT_ANALOG_X:0,Y:0');
    }
    activeAnalog = '';
    updateInfo();
});