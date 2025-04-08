


console.clear();

// Opsætning af canvas
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const tools = document.querySelectorAll('.menu-icons img');

// Tilstande og position
let currentTool = 'Pencil';
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isDrawingLine = false;

// Nyt element til at erstat den almindelige mus
const customCursor = document.createElement('div');
customCursor.id = 'customCursor';
document.body.appendChild(customCursor);

// Når man trykker indenfor canvas
canvas.addEventListener('mousedown', (e) => {
    if (currentTool === 'Line') {
        if (!isDrawingLine) {
            isDrawingLine = true;
        } else {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            isDrawingLine = false;
        }
    } else {
        isDrawing = true;
    }
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Når man tegner med musen
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Når man bevæger musen
canvas.addEventListener('mousemove', (e) => {
    const offsetX = parseInt(customCursor.getAttribute('data-offset-x')) || 0;
    const offsetY = parseInt(customCursor.getAttribute('data-offset-y')) || 0;

    customCursor.style.left = `${e.pageX}px`;
    customCursor.style.top = `${e.pageY}px`;
    customCursor.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    
    canvas.style.cursor = 'none';
    customCursor.style.display = 'block';

    switch (currentTool) {
        case 'Pencil':
            ctx.strokeStyle = '#000000'; // farve
            ctx.lineWidth = 8; // størrelse
            // musens udseende
            customCursor.style.backgroundImage = "url('sprites/40x40/pencil.png')";
            customCursor.setAttribute('data-offset-x', '-10');
            customCursor.setAttribute('data-offset-y', '-31');
            break;
        case 'Eraser':
            ctx.strokeStyle = '#ffffff' // farve
            ctx.lineWidth = 20; // størrelse
            // musens udseende:
            customCursor.style.backgroundImage = "url('sprites/40x40/eraser.png')";
            customCursor.setAttribute('data-offset-x', '-10');
            customCursor.setAttribute('data-offset-y', '-15');
            break;
        case 'Line':
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 8; // Eraser width
            // musens udseende:
            customCursor.style.backgroundImage = "url('sprites/40x40/line.png')";
            customCursor.setAttribute('data-offset-x', '-20');
            customCursor.setAttribute('data-offset-y', '-20');
            break;
        case 'Cursor':
            ctx.lineWidth = 0.01;
            canvas.style.cursor = 'default';
            customCursor.style.display = 'none';
            break;
        case 'Save':
            saveDrawing();
            break;
        case 'ChangeScene':
            saveDrawingToLocal();
            changeScene();
            break;
        default:
            break;
    }
});

// Når musen er uden for tegne-feltet
canvas.addEventListener('mouseout', () => {
    customCursor.style.display = 'none';
    isDrawing = false;
});

// Når der ikke bliver trykket
canvas.addEventListener('mouseup', () => (isDrawing = false));

// For hvert værktøj skal den kører følgende funktion
tools.forEach((tool) => {
    tool.addEventListener('click', () => {
        currentTool = tool.getAttribute('data-tool');
        console.log("Selected tool: " + currentTool);
        tools.forEach(t => {
            t.src = `sprites/${t.getAttribute('data-tool')}.png`;
        });

        tool.src = `sprites/${currentTool}-hl.png`;
    });
});

// Gemme sin tegning
function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Gemme sin tegning lokalt
function saveDrawingToLocal() {
    const drawingData = canvas.toDataURL('image/png');
    localStorage.setItem('savedDrawing', drawingData);
}

// Skift scene
function changeScene() {
    window.location.href = '../game/scene1.html';
}

// Upload en tegning som er transparent bag ved canvas

// Skift farve på blyanten

// fylde farve ud på et område (bucket tool)
