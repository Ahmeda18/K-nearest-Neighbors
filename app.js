const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const kInput = document.getElementById('k-value');
const modeRed = document.getElementById('mode-red');
const modeBlue = document.getElementById('mode-blue');
const modeKNN = document.getElementById('mode-knn');
const clearBtn = document.getElementById('clear');

let mode = 'red'; // 'red', 'blue', 'knn'
let points = []; // {x, y, color}

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 7, 0, 2 * Math.PI);
        ctx.fillStyle = p.color === 'red' ? 'red' : 'blue';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
    }
}

function getKNNColor(x, y, k) {
    if (points.length === 0) return 'red'; // default
    // Calculate distances
    const dists = points.map(p => ({
        color: p.color,
        dist: Math.hypot(p.x - x, p.y - y)
    }));
    dists.sort((a, b) => a.dist - b.dist);
    const nearest = dists.slice(0, k);
    const reds = nearest.filter(p => p.color === 'red').length;
    const blues = nearest.filter(p => p.color === 'blue').length;
    return reds >= blues ? 'red' : 'blue';
}

canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let color;
    if (mode === 'red') color = 'red';
    else if (mode === 'blue') color = 'blue';
    else if (mode === 'knn') color = getKNNColor(x, y, parseInt(kInput.value));
    points.push({x, y, color});
    drawPoints();
});

modeRed.onclick = () => { mode = 'red'; };
modeBlue.onclick = () => { mode = 'blue'; };
modeKNN.onclick = () => { mode = 'knn'; };
clearBtn.onclick = () => {
    points = [];
    drawPoints();
};

drawPoints();
