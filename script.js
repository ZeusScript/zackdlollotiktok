const SVG_ASSETS = {
    shelby: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#0099FF" stroke="#000" stroke-width="4"/>
        <path d="M 20 50 Q 50 20 80 50 L 80 80 Q 50 95 20 80 Z" fill="#FFCC00" stroke="#000" stroke-width="3"/>
        <circle cx="35" cy="45" r="8" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="65" cy="45" r="8" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="37" cy="45" r="4" fill="#000"/>
        <circle cx="67" cy="45" r="4" fill="#000"/>
        <path d="M 30 25 Q 50 10 70 25 L 80 35 L 20 35 Z" fill="#990000" stroke="#000" stroke-width="3"/>
        <path d="M 40 68 Q 50 78 60 68" stroke="#000" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
    bull: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#FF2A2A" stroke="#000" stroke-width="4"/>
        <path d="M 10 30 Q 0 10 25 20 Z" fill="#FFF" stroke="#000" stroke-width="3"/>
        <path d="M 90 30 Q 100 10 75 20 Z" fill="#FFF" stroke="#000" stroke-width="3"/>
        <circle cx="35" cy="45" r="7" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="65" cy="45" r="7" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="35" cy="45" r="3" fill="#000"/>
        <circle cx="65" cy="45" r="3" fill="#000"/>
        <path d="M 30 25 L 70 25 L 50 40 Z" fill="#333" stroke="#000" stroke-width="2"/>
        <circle cx="50" cy="65" r="10" fill="#FFCC00" stroke="#000" stroke-width="3"/>
        <circle cx="50" cy="65" r="5" fill="#FF2A2A"/>
    </svg>`,
    crow: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#A628F7" stroke="#000" stroke-width="4"/>
        <path d="M 25 50 L 75 50 L 50 90 Z" fill="#FF6600" stroke="#000" stroke-width="4"/>
        <ellipse cx="35" cy="40" rx="8" ry="12" fill="#FFF" stroke="#000" stroke-width="2"/>
        <ellipse cx="65" cy="40" rx="8" ry="12" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="35" cy="40" r="4" fill="#FF2A2A"/>
        <circle cx="65" cy="40" r="4" fill="#FF2A2A"/>
        <path d="M 20 20 L 50 35 L 80 20 L 50 10 Z" fill="#1A2434" stroke="#000" stroke-width="3"/>
    </svg>`
};

const BRAWLERS = [
    { id: 'shelby', name: 'SHELBY', rarity: 'Comune', rarityColor: '#0099FF', color: '#0099FF', hp: 1200, damage: 210, speed: 3.8, class: 'Danni', desc: 'Raffica ad ampio raggio.', svg: SVG_ASSETS.shelby },
    { id: 'bull', name: 'BULL', rarity: 'Raro', rarityColor: '#00E640', color: '#FF2A2A', hp: 1800, damage: 340, speed: 3.2, class: 'Peso Massimo', desc: 'Devastante da vicino.', svg: SVG_ASSETS.bull },
    { id: 'crow', name: 'CROW', rarity: 'Leggendario', rarityColor: '#FFCC00', color: '#A628F7', hp: 900, damage: 160, speed: 4.5, class: 'Assassino', desc: 'Velocissimo nei movimenti.', svg: SVG_ASSETS.crow }
];

const SKINS = [
    { id: 'default', name: 'Predefinita' },
    { id: 'gold', name: 'Oro Puro' },
    { id: 'mecha', name: 'Mecha Cyber' }
];

// MODIFICA MAPPE: MATRICI TILE GRIDS CON LOGICA STRUTTURALE BILANCIATA (0: vuoto, 1: muro, 2: cespuglio, 3: meta/obiettivo)
const MAPS = [
    { 
        id: 'gem_grab', name: 'Miniera Gemme', mode: '3v3 Standard', bg: '#2E4C1E', gridColor: '#243D17', wallColor: '#5C4033', desc: 'Controllo centrale bilanciato con zone speculari.',
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,2,2,2,0,0,1,1,0,1],
            [1,0,1,1,0,0,2,2,2,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,2,2,0,0,1,1,0,1,1,0,0,2,2,1],
            [1,2,2,0,0,1,0,3,0,1,0,0,2,2,1],
            [1,2,2,0,0,1,1,0,1,1,0,0,2,2,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,2,2,2,0,0,1,1,0,1],
            [1,0,1,1,0,0,2,2,2,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    },
    { 
        id: 'brawl_ball', name: 'Stadio Brawl', mode: 'Azione Sportiva', bg: '#1E3A5F', gridColor: '#162C48', wallColor: '#3B4D6B', desc: 'Pareti difensive laterali e corsie libere verso le porte.',
        grid: [
            [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,1,1,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
            [1,1,0,0,0,0,2,2,2,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,3,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,2,2,2,0,0,0,0,1,1],
            [1,0,0,0,0,0,2,2,2,0,0,0,0,0,1],
            [1,0,1,1,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,1,1,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,0,0,0,1,1,1,1,1,1]
        ]
    },
    { 
        id: 'desert', name: 'Canyon Secco', mode: 'Sopravvivenza', bg: '#8B4513', gridColor: '#72380F', wallColor: '#A0522D', desc: 'Mappa labirintica con ampie macchie di cespugli tattici.',
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,0,0,0,1,0,0,0,2,2,2,1],
            [1,2,2,2,0,1,0,1,0,1,0,2,2,2,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
            [1,0,1,0,0,0,2,2,2,0,0,0,1,0,1],
            [1,1,1,0,0,2,2,3,2,2,0,0,1,1,1],
            [1,0,1,0,0,0,2,2,2,0,0,0,1,0,1],
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
            [1,2,2,2,0,1,0,1,0,1,0,2,2,2,1],
            [1,2,2,2,0,0,0,1,0,0,0,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    }
];

let currentBrawler = BRAWLERS[0];
let currentSkin = SKINS[0];
let currentMap = MAPS[0];

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function renderSelectionLists() {
    const bContainer = document.getElementById('brawlers-list');
    bContainer.innerHTML = '';
    BRAWLERS.forEach(b => {
        const item = document.createElement('div');
        item.className = `card-item ${currentBrawler.id === b.id ? 'selected' : ''}`;
        item.onclick = () => { currentBrawler = b; updateLobbyDisplay(); renderSelectionLists(); closeModal('brawlers-modal'); };
        item.innerHTML = `
            <div class="card-img-box" style="border-color:${b.rarityColor}">${b.svg}</div>
            <div class="card-info">
                <div class="card-title">${b.name} <span style="font-size:11px; color:${b.rarityColor};">(${b.rarity})</span></div>
                <div style="font-size:10px; color:#CBD5E1;">${b.desc}</div>
                <div class="card-stats">
                    <span class="stat-badge">❤️ ${b.hp}</span>
                    <span class="stat-badge">⚔️ ${b.damage}</span>
                </div>
            </div>`;
        bContainer.appendChild(item);
    });

    const sContainer = document.getElementById('skins-list');
    sContainer.innerHTML = '';
    SKINS.forEach(s => {
        const item = document.createElement('div');
        item.className = `card-item ${currentSkin.id === s.id ? 'selected' : ''}`;
        item.onclick = () => { currentSkin = s; updateLobbyDisplay(); renderSelectionLists(); closeModal('skins-modal'); };
        item.innerHTML = `
            <div class="card-img-box">${currentBrawler.svg}</div>
            <div class="card-info">
                <div class="card-title">${s.name}</div>
                <div style="font-size:11px; color:#aaa;">Skin per ${currentBrawler.name}</div>
            </div>`;
        sContainer.appendChild(item);
    });

    const mContainer = document.getElementById('maps-list');
    mContainer.innerHTML = '';
    MAPS.forEach(m => {
        const item = document.createElement('div');
        item.className = `card-item ${currentMap.id === m.id ? 'selected' : ''}`;
        item.onclick = () => { currentMap = m; renderSelectionLists(); closeModal('maps-modal'); };
        item.innerHTML = `
            <div class="card-img-box" style="background:${m.bg}">🗺️</div>
            <div class="card-info">
                <div class="card-title">${m.name} <span style="font-size:10px; color:var(--brawl-yellow);">[${m.mode}]</span></div>
                <div style="font-size:10px; color:#CBD5E1;">${m.desc}</div>
            </div>`;
        mContainer.appendChild(item);
    });
}

function updateLobbyDisplay() {
    document.getElementById('lobby-brawler-name').innerText = currentBrawler.name;
    document.getElementById('lobby-rarity-tag').innerText = `${currentBrawler.rarity} - ${currentBrawler.class}`;
    document.getElementById('lobby-rarity-tag').style.backgroundColor = currentBrawler.rarityColor;
    document.getElementById('lobby-brawler-img').innerHTML = currentBrawler.svg;
}

function toggleFullScreen() {
    let doc = window.document;
    let docEl = doc.documentElement;
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        (docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen).call(docEl);
    } else {
        (doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen).call(doc);
    }
}

/* --- GAME ENGINE CON GRIGLIA TILE PER LE MAPPE --- */
let canvas, ctx;
let gameRunning = false;
let player = { x: 0, y: 0, radius: 18, hp: 1000, maxHp: 1000, vx: 0, vy: 0, angle: 0 };
let enemy = { x: 0, y: 0, radius: 18, hp: 1200, maxHp: 1200, vx: 1.5, vy: 1.5, brawler: BRAWLERS[1] };
let bullets = [];
let brawlerImages = {};
let mapObstacles = [];
let mapBushes = [];
let tileSize = 32;

function cacheBrawlerSVGs() {
    BRAWLERS.forEach(b => {
        const img = new Image();
        const blob = new Blob([b.svg], {type: 'image/svg+xml'});
        img.src = URL.createObjectURL(blob);
        brawlerImages[b.id] = img;
    });
}

function buildMapLayout() {
    mapObstacles = [];
    mapBushes = [];
    const grid = currentMap.grid;
    const rows = grid.length;
    const cols = grid[0].length;

    // Adatta la dimensione delle tessere alla risoluzione dello schermo
    tileSize = Math.min(canvas.width / cols, canvas.height / rows);
    const offsetX = (canvas.width - cols * tileSize) / 2;
    const offsetY = (canvas.height - rows * tileSize) / 2;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = grid[r][c];
            let x = offsetX + c * tileSize;
            let y = offsetY + r * tileSize;

            if (cell === 1) {
                mapObstacles.push({ x, y, w: tileSize, h: tileSize });
            } else if (cell === 2) {
                mapBushes.push({ x: x + tileSize / 2, y: y + tileSize / 2, r: tileSize / 1.8 });
            }
        }
    }
}

function startGame() {
    document.getElementById('lobby-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    buildMapLayout();

    player.x = canvas.width / 2;
    player.y = canvas.height * 0.85;
    player.hp = currentBrawler.hp;
    player.maxHp = currentBrawler.hp;

    enemy.x = canvas.width / 2;
    enemy.y = canvas.height * 0.15;
    enemy.hp = enemy.brawler.hp;
    enemy.maxHp = enemy.brawler.hp;

    bullets = [];
    gameRunning = true;
    initJoystick();
    bindActionButtons();
    requestAnimationFrame(gameLoop);
}

function exitGame() {
    gameRunning = false;
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('lobby-screen').classList.add('active');
}

function triggerAttack() {
    if(!gameRunning) return;
    bullets.push({
        x: player.x, y: player.y,
        vx: Math.cos(player.angle) * 12, vy: Math.sin(player.angle) * 12,
        radius: 6, damage: currentBrawler.damage, isPlayer: true
    });
}

function triggerSuper() {
    if(!gameRunning) return;
    for(let i = -2; i <= 2; i++) {
        let a = player.angle + (i * 0.2);
        bullets.push({
            x: player.x, y: player.y,
            vx: Math.cos(a) * 14, vy: Math.sin(a) * 14,
            radius: 9, damage: currentBrawler.damage * 1.3, isPlayer: true
        });
    }
}

function bindActionButtons() {
    const btnAttack = document.getElementById('btn-attack');
    const btnSuper = document.getElementById('btn-super');
    const bind = (el, cb) => {
        el.onpointerdown = (e) => { e.preventDefault(); e.stopPropagation(); cb(); };
    };
    bind(btnAttack, triggerAttack);
    bind(btnSuper, triggerSuper);
}

function checkWallCollisions(ent) {
    mapObstacles.forEach(w => {
        if (ent.x + ent.radius > w.x && ent.x - ent.radius < w.x + w.w &&
            ent.y + ent.radius > w.y && ent.y - ent.radius < w.y + w.h) {
            ent.x -= ent.vx;
            ent.y -= ent.vy;
        }
    });
}

function updateGameLogic() {
    player.x += player.vx;
    player.y += player.vy;
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
    checkWallCollisions(player);

    enemy.x += enemy.vx;
    enemy.y += enemy.vy;
    if(enemy.x < 40 || enemy.x > canvas.width - 40) enemy.vx *= -1;
    if(enemy.y < 40 || enemy.y > canvas.height * 0.4) enemy.vy *= -1;
    checkWallCollisions(enemy);

    for(let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        if(b.isPlayer) {
            let dx = b.x - enemy.x;
            let dy = b.y - enemy.y;
            if(Math.sqrt(dx*dx + dy*dy) < b.radius + enemy.radius) {
                enemy.hp -= b.damage;
                if(enemy.hp <= 0) enemy.hp = enemy.maxHp;
                bullets.splice(i, 1);
                continue;
            }
        }

        mapObstacles.forEach(w => {
            if (b.x > w.x && b.x < w.x + w.w && b.y > w.y && b.y < w.y + w.h) {
                bullets.splice(i, 1);
            }
        });

        if(b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(i, 1);
        }
    }
}

function drawCharacter(ent, brawlerData, isPlayer) {
    ctx.save();
    ctx.translate(ent.x, ent.y);

    ctx.beginPath();
    ctx.ellipse(0, ent.radius - 2, ent.radius, ent.radius / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = isPlayer ? 'rgba(0, 230, 64, 0.4)' : 'rgba(255, 42, 42, 0.4)';
    ctx.fill();

    const img = brawlerImages[brawlerData.id];
    if (img) {
        ctx.drawImage(img, -ent.radius, -ent.radius - 4, ent.radius * 2, ent.radius * 2);
    }
    ctx.restore();

    const barWidth = 40;
    const barHeight = 6;
    const barX = ent.x - barWidth / 2;
    const barY = ent.y - ent.radius - 18;

    ctx.fillStyle = '#000';
    ctx.fillRect(barX - 1, barY - 1, barWidth + 2, barHeight + 2);
    ctx.fillStyle = isPlayer ? '#00E640' : '#FF2A2A';
    ctx.fillRect(barX, barY, barWidth * Math.max(0, ent.hp / ent.maxHp), barHeight);
}

function drawGame() {
    ctx.fillStyle = currentMap.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = currentMap.gridColor;
    ctx.lineWidth = 1;
    for(let x = 0; x < canvas.width; x += tileSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for(let y = 0; y < canvas.height; y += tileSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    mapObstacles.forEach(w => {
        ctx.fillStyle = currentMap.wallColor;
        ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(w.x, w.y, w.w, w.h);
    });

    mapBushes.forEach(b => {
        ctx.fillStyle = 'rgba(0, 153, 51, 0.75)';
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
    });

    drawCharacter(enemy, enemy.brawler, false);
    drawCharacter(player, currentBrawler, true);

    bullets.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFCC00';
        ctx.fill();
    });
}

function gameLoop() {
    if(!gameRunning) return;
    updateGameLogic();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function initJoystick() {
    const zone = document.getElementById('joystick-zone');
    const knob = document.getElementById('joystick-knob');
    let active = false;
    let touchId = null;
    let startX, startY;

    zone.addEventListener('pointerdown', e => {
        active = true;
        touchId = e.pointerId;
        zone.setPointerCapture(e.pointerId);
        let rect = zone.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
    });

    zone.addEventListener('pointermove', e => {
        if(!active || e.pointerId !== touchId) return;
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        let dist = Math.sqrt(dx*dx + dy*dy);
        let maxRadius = 35;

        if(dist > maxRadius) {
            dx = (dx / dist) * maxRadius;
            dy = (dy / dist) * maxRadius;
        }

        knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        player.vx = (dx / maxRadius) * currentBrawler.speed;
        player.vy = (dy / maxRadius) * currentBrawler.speed;
        if(dx !== 0 || dy !== 0) player.angle = Math.atan2(dy, dx);
    });

    const reset = e => {
        if (e.pointerId === touchId) {
            active = false;
            knob.style.transform = `translate(-50%, -50%)`;
            player.vx = 0; player.vy = 0;
        }
    };
    zone.addEventListener('pointerup', reset);
    zone.addEventListener('pointercancel', reset);
}

let peer = new Peer();
let conn = null;
peer.on('open', id => { document.getElementById('my-peer-id').value = id; });
peer.on('connection', c => { conn = c; setupChatConnection(); });

function connectToPeer() {
    let remoteId = document.getElementById('join-peer-id').value;
    if(remoteId) { conn = peer.connect(remoteId); setupChatConnection(); }
}

function setupChatConnection() {
    conn.on('data', data => { if(data.type === 'chat') appendChatMessage("Amico", data.msg); });
    appendChatMessage("Sistema", "Connesso!");
}

function sendChatMessage() {
    let input = document.getElementById('chat-msg');
    if(input.value) {
        appendChatMessage("Tu", input.value);
        if(conn) conn.send({ type: 'chat', msg: input.value });
        input.value = '';
    }
}

function appendChatMessage(author, msg) {
    let box = document.getElementById('chat-box');
    let div = document.createElement('div');
    div.innerHTML = `<strong>${author}:</strong> ${msg}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

window.addEventListener('resize', () => {
    if (gameRunning) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildMapLayout();
    }
});

cacheBrawlerSVGs();
renderSelectionLists();
updateLobbyDisplay();
