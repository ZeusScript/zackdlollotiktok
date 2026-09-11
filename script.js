const SVG_ASSETS = {
    shelby: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#0099FF" stroke="#000" stroke-width="4"/>
        <path d="M 20 50 Q 50 20 80 50 L 80 80 Q 50 95 20 80 Z" fill="#FFCC00" stroke="#000" stroke-width="3"/>
        <circle cx="35" cy="45" r="8" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="65" cy="45" r="8" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="37" cy="45" r="4" fill="#000"/>
        <circle cx="67" cy="45" r="4" fill="#000"/>
    </svg>`,
    bull: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#FF2A2A" stroke="#000" stroke-width="4"/>
        <path d="M 10 30 Q 0 10 25 20 Z" fill="#FFF" stroke="#000" stroke-width="3"/>
        <path d="M 90 30 Q 100 10 75 20 Z" fill="#FFF" stroke="#000" stroke-width="3"/>
        <circle cx="35" cy="45" r="7" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="65" cy="45" r="7" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="35" cy="45" r="3" fill="#000"/>
        <circle cx="65" cy="45" r="3" fill="#000"/>
    </svg>`,
    crow: `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="45" fill="#A628F7" stroke="#000" stroke-width="4"/>
        <ellipse cx="35" cy="40" rx="8" ry="12" fill="#FFF" stroke="#000" stroke-width="2"/>
        <ellipse cx="65" cy="40" rx="8" ry="12" fill="#FFF" stroke="#000" stroke-width="2"/>
        <circle cx="35" cy="40" r="4" fill="#FF2A2A"/>
        <circle cx="65" cy="40" r="4" fill="#FF2A2A"/>
    </svg>`
};

const BRAWLERS = [
    { id: 'shelby', name: 'SHELBY', rarity: 'Comune', rarityColor: '#0099FF', color: '#0099FF', hp: 1200, damage: 220, speed: 4, svg: SVG_ASSETS.shelby },
    { id: 'bull', name: 'BULL', rarity: 'Raro', rarityColor: '#00E640', color: '#FF2A2A', hp: 1800, damage: 320, speed: 3.5, svg: SVG_ASSETS.bull },
    { id: 'crow', name: 'CROW', rarity: 'Leggendario', rarityColor: '#FFCC00', color: '#A628F7', hp: 900, damage: 170, speed: 5, svg: SVG_ASSETS.crow }
];

const SKINS = [{ id: 'default', name: 'Predefinita' }];

const MAP_GRID = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,2,2,2,0,2,2,2,0,0,1,1,0,0],
    [0,0,1,1,0,0,2,2,2,0,2,2,2,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,1,1,0,0,0,0,0,1,1,0,0,2,2,0],
    [0,2,2,0,0,1,0,0,0,0,0,0,0,1,0,0,2,2,0],
    [0,2,2,0,0,1,1,0,0,0,0,0,1,1,0,0,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,2,2,2,0,2,2,2,0,0,1,1,0,0],
    [0,0,1,1,0,0,2,2,2,0,2,2,2,0,0,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

let currentBrawler = BRAWLERS[0];
let currentSkin = SKINS[0];

let canvas, ctx;
let gameRunning = false;
let gameTime = 60;
let timerInterval = null;
let gemSpawnerInterval = null;

let player = { x: 0, y: 0, radius: 20, hp: 1000, maxHp: 1000, vx: 0, vy: 0, aimAngle: 0, gems: 0 };
let enemy = { x: 0, y: 0, radius: 20, hp: 1200, maxHp: 1200, vx: 1.5, vy: 1.5, brawler: BRAWLERS[1], gems: 0, lastShoot: 0 };

let bullets = [];
let gemsOnGround = [];
let mapObstacles = [];
let mapBushes = [];
let minePos = { x: 0, y: 0 };
let tileSize = 32;

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function updateLobbyDisplay() {
    document.getElementById('lobby-brawler-name').innerText = currentBrawler.name;
    document.getElementById('lobby-rarity-tag').innerText = currentBrawler.rarity;
    document.getElementById('lobby-rarity-tag').style.backgroundColor = currentBrawler.rarityColor;
    document.getElementById('lobby-brawler-img').innerHTML = currentBrawler.svg;
}

function renderSelectionLists() {
    const bContainer = document.getElementById('brawlers-list');
    bContainer.innerHTML = '';
    BRAWLERS.forEach(b => {
        const item = document.createElement('div');
        item.className = `card-item ${currentBrawler.id === b.id ? 'selected' : ''}`;
        item.onclick = () => { currentBrawler = b; updateLobbyDisplay(); closeModal('brawlers-modal'); };
        item.innerHTML = `<div class="card-img-box">${b.svg}</div><div>${b.name}</div>`;
        bContainer.appendChild(item);
    });
}

function toggleFullScreen() {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen(); }
}

/* AVVIO E SCHERMATA VS */
function startGameIntro() {
    document.getElementById('lobby-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    document.getElementById('vs-p1-img').innerHTML = currentBrawler.svg;
    document.getElementById('vs-p1-name').innerText = currentBrawler.name;
    document.getElementById('vs-p2-img').innerHTML = enemy.brawler.svg;
    document.getElementById('vs-p2-name').innerText = enemy.brawler.name;

    const vsOverlay = document.getElementById('vs-overlay');
    vsOverlay.classList.add('active');

    setTimeout(() => {
        vsOverlay.classList.remove('active');
        runCountdown();
    }, 2500);
}

function runCountdown() {
    const cdOverlay = document.getElementById('countdown-overlay');
    cdOverlay.classList.add('active');
    let count = 3;
    cdOverlay.innerText = count;

    let interval = setInterval(() => {
        count--;
        if (count > 0) {
            cdOverlay.innerText = count;
        } else if (count === 0) {
            cdOverlay.innerText = "VIA!";
        } else {
            clearInterval(interval);
            cdOverlay.classList.remove('active');
            initMatch();
        }
    }, 800);
}

function initMatch() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    buildMap();

    player.x = canvas.width / 2;
    player.y = canvas.height * 0.8;
    player.hp = currentBrawler.hp;
    player.maxHp = currentBrawler.hp;
    player.gems = 0;

    enemy.x = canvas.width / 2;
    enemy.y = canvas.height * 0.2;
    enemy.hp = enemy.brawler.hp;
    enemy.maxHp = enemy.brawler.hp;
    enemy.gems = 0;

    bullets = [];
    gemsOnGround = [];
    gameTime = 60;
    gameRunning = true;

    initJoysticks();
    bindSuperButton();

    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if(!gameRunning) return;
        gameTime--;
        let sec = gameTime % 60;
        document.getElementById('match-timer').innerText = `00:${sec < 10 ? '0' : ''}${sec}`;
        if(gameTime <= 0) endGame();
    }, 1000);

    if(gemSpawnerInterval) clearInterval(gemSpawnerInterval);
    gemSpawnerInterval = setInterval(() => {
        if(!gameRunning || gemsOnGround.length >= 10) return;
        gemsOnGround.push({ x: minePos.x + (Math.random()*20 - 10), y: minePos.y + (Math.random()*20 - 10) });
    }, 4000);

    requestAnimationFrame(gameLoop);
}

function buildMap() {
    mapObstacles = [];
    mapBushes = [];
    const rows = MAP_GRID.length;
    const cols = MAP_GRID[0].length;

    tileSize = Math.min(canvas.width / cols, canvas.height / rows);
    const offsetX = (canvas.width - cols * tileSize) / 2;
    const offsetY = (canvas.height - rows * tileSize) / 2;

    minePos = { x: canvas.width / 2, y: canvas.height / 2 };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = MAP_GRID[r][c];
            let x = offsetX + c * tileSize;
            let y = offsetY + r * tileSize;

            if (cell === 1) mapObstacles.push({ x, y, w: tileSize, h: tileSize });
            else if (cell === 2) mapBushes.push({ x: x + tileSize / 2, y: y + tileSize / 2, r: tileSize / 1.8 });
        }
    }
}

function shootBullet(ent, angle, isPlayer) {
    bullets.push({
        x: ent.x, y: ent.y,
        vx: Math.cos(angle) * 9, vy: Math.sin(angle) * 9,
        radius: 6, damage: isPlayer ? currentBrawler.damage : enemy.brawler.damage,
        isPlayer: isPlayer
    });
}

function initJoysticks() {
    // MOVIMENTO
    const moveZone = document.getElementById('joystick-move');
    const moveKnob = document.getElementById('knob-move');
    let moveActive = false, moveTouchId = null, mStartX, mStartY;

    moveZone.onpointerdown = e => {
        moveActive = true; moveTouchId = e.pointerId;
        moveZone.setPointerCapture(e.pointerId);
        let r = moveZone.getBoundingClientRect();
        mStartX = r.left + r.width / 2; mStartY = r.top + r.height / 2;
    };

    moveZone.onpointermove = e => {
        if(!moveActive || e.pointerId !== moveTouchId) return;
        let dx = e.clientX - mStartX, dy = e.clientY - mStartY;
        let dist = Math.sqrt(dx*dx + dy*dy), maxR = 35;
        if(dist > maxR) { dx = (dx/dist)*maxR; dy = (dy/dist)*maxR; }
        moveKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        player.vx = (dx/maxR) * currentBrawler.speed;
        player.vy = (dy/maxR) * currentBrawler.speed;
    };

    const resetMove = e => {
        if(e && e.pointerId === moveTouchId) {
            moveActive = false; moveKnob.style.transform = `translate(-50%, -50%)`;
            player.vx = 0; player.vy = 0;
        }
    };
    moveZone.onpointerup = resetMove; moveZone.onpointercancel = resetMove;

    // MIRA E SPARO
    const aimZone = document.getElementById('joystick-aim');
    const aimKnob = document.getElementById('knob-aim');
    let aimActive = false, aimTouchId = null, aStartX, aStartY;

    aimZone.onpointerdown = e => {
        aimActive = true; aimTouchId = e.pointerId;
        aimZone.setPointerCapture(e.pointerId);
        let r = aimZone.getBoundingClientRect();
        aStartX = r.left + r.width / 2; aStartY = r.top + r.height / 2;
    };

    aimZone.onpointermove = e => {
        if(!aimActive || e.pointerId !== aimTouchId) return;
        let dx = e.clientX - aStartX, dy = e.clientY - aStartY;
        let dist = Math.sqrt(dx*dx + dy*dy), maxR = 25;
        if(dist > maxR) { dx = (dx/dist)*maxR; dy = (dy/dist)*maxR; }
        aimKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        if(dist > 5) player.aimAngle = Math.atan2(dy, dx);
    };

    aimZone.onpointerup = e => {
        if(e && e.pointerId === aimTouchId) {
            aimActive = false; aimKnob.style.transform = `translate(-50%, -50%)`;
            let angle = player.aimAngle !== undefined ? player.aimAngle : Math.atan2(enemy.y - player.y, enemy.x - player.x);
            shootBullet(player, angle, true);
        }
    };
}

function bindSuperButton() {
    const btnSuper = document.getElementById('btn-super');
    btnSuper.onpointerdown = e => {
        e.preventDefault(); e.stopPropagation();
        let baseAngle = player.aimAngle || Math.atan2(enemy.y - player.y, enemy.x - player.x);
        for(let i = -2; i <= 2; i++) {
            shootBullet(player, baseAngle + (i * 0.2), true);
        }
    };
}

function updateGameLogic() {
    // Movimento Giocatore
    player.x += player.vx; player.y += player.vy;
    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
    checkObstacleCollisions(player);

    // Movimento e Sparo IA Nemico
    enemy.x += enemy.vx; enemy.y += enemy.vy;
    if(enemy.x < 40 || enemy.x > canvas.width - 40) enemy.vx *= -1;
    if(enemy.y < 40 || enemy.y > canvas.height * 0.4) enemy.vy *= -1;
    checkObstacleCollisions(enemy);

    let now = Date.now();
    if(now - enemy.lastShoot > 1800) {
        enemy.lastShoot = now;
        let angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        shootBullet(enemy, angle, false);
    }

    // Gestione Proiettili
    for(let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        b.x += b.vx; b.y += b.vy;

        let target = b.isPlayer ? enemy : player;
        let dx = b.x - target.x, dy = b.y - target.y;
        if(Math.sqrt(dx*dx + dy*dy) < b.radius + target.radius) {
            target.hp -= b.damage;
            bullets.splice(i, 1);
            if(target.hp <= 0) handleDeath(target);
            continue;
        }

        mapObstacles.forEach(w => {
            if (b.x > w.x && b.x < w.x + w.w && b.y > w.y && b.y < w.y + w.h) {
                bullets.splice(i, 1);
            }
        });

        if(b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) bullets.splice(i, 1);
    }

    // Raccolta Gemme
    for(let i = gemsOnGround.length - 1; i >= 0; i--) {
        let g = gemsOnGround[i];
        if(Math.hypot(player.x - g.x, player.y - g.y) < player.radius + 10) {
            player.gems++; gemsOnGround.splice(i, 1);
        } else if(Math.hypot(enemy.x - g.x, enemy.y - g.y) < enemy.radius + 10) {
            enemy.gems++; gemsOnGround.splice(i, 1);
        }
    }

    document.getElementById('blue-gems').innerText = player.gems;
    document.getElementById('red-gems').innerText = enemy.gems;
}

function handleDeath(ent) {
    let droppedGems = ent.gems;
    ent.gems = 0;
    for(let i=0; i<droppedGems; i++) {
        gemsOnGround.push({ x: ent.x + (Math.random()*40-20), y: ent.y + (Math.random()*40-20) });
    }
    ent.hp = ent.maxHp;
    if(ent === player) { ent.x = canvas.width/2; ent.y = canvas.height*0.8; }
    else { ent.x = canvas.width/2; ent.y = canvas.height*0.2; }
}

function checkObstacleCollisions(ent) {
    mapObstacles.forEach(w => {
        if (ent.x + ent.radius > w.x && ent.x - ent.radius < w.x + w.w &&
            ent.y + ent.radius > w.y && ent.y - ent.radius < w.y + w.h) {
            ent.x -= ent.vx; ent.y -= ent.vy;
        }
    });
}

function drawGame() {
    ctx.fillStyle = '#2E4C1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mappa e Ostacoli
    mapObstacles.forEach(w => {
        ctx.fillStyle = '#5C4033'; ctx.fillRect(w.x, w.y, w.w, w.h);
        ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(w.x, w.y, w.w, w.h);
    });

    mapBushes.forEach(b => {
        ctx.fillStyle = 'rgba(0, 180, 50, 0.7)';
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
    });

    // Miniera Gemme
    ctx.fillStyle = '#444';
    ctx.fillRect(minePos.x - 20, minePos.y - 20, 40, 40);
    ctx.fillStyle = '#A628F7';
    ctx.beginPath(); ctx.arc(minePos.x, minePos.y, 8, 0, Math.PI * 2); ctx.fill();

    // Gemme a terra
    gemsOnGround.forEach(g => {
        ctx.fillStyle = '#A628F7'; ctx.beginPath(); ctx.arc(g.x, g.y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#FFF'; ctx.lineWidth = 1; ctx.stroke();
    });

    // Entità (Player e Enemy)
    drawEntity(enemy, enemy.brawler.color, false);
    drawEntity(player, currentBrawler.color, true);

    // Proiettili
    bullets.forEach(b => {
        ctx.fillStyle = b.isPlayer ? '#FFCC00' : '#FF2A2A';
        ctx.beginPath(); ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); ctx.fill();
    });
}

function drawEntity(ent, color, isPlayer) {
    ctx.save();
    ctx.translate(ent.x, ent.y);

    ctx.beginPath(); ctx.arc(0, 0, ent.radius, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = '#000'; ctx.stroke();

    if(isPlayer && player.aimAngle) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(player.aimAngle)*50, Math.sin(player.aimAngle)*50);
        ctx.stroke();
    }
    ctx.restore();

    // Barra Vita e Conteggio Gemme
    const barW = 40, barH = 5;
    ctx.fillStyle = '#000';
    ctx.fillRect(ent.x - barW/2 - 1, ent.y - ent.radius - 12, barW + 2, barH + 2);
    ctx.fillStyle = isPlayer ? '#00E640' : '#FF2A2A';
    ctx.fillRect(ent.x - barW/2, ent.y - ent.radius - 11, barW * (ent.hp/ent.maxHp), barH);

    if(ent.gems > 0) {
        ctx.fillStyle = '#A628F7'; ctx.font = '12px Arial';
        ctx.fillText(`💎${ent.gems}`, ent.x - 10, ent.y - ent.radius - 16);
    }
}

function gameLoop() {
    if(!gameRunning) return;
    updateGameLogic();
    drawGame();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    clearInterval(timerInterval);
    clearInterval(gemSpawnerInterval);
    let msg = player.gems > enemy.gems ? "VITTORIA!" : (player.gems < enemy.gems ? "SCONFITTA!" : "PAREGGIO!");
    alert(`Partita Finita! ${msg}\nGemme Tue: ${player.gems} - Gemme Nemiche: ${enemy.gems}`);
    exitGame();
}

function exitGame() {
    gameRunning = false;
    if(timerInterval) clearInterval(timerInterval);
    if(gemSpawnerInterval) clearInterval(gemSpawnerInterval);
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('lobby-screen').classList.add('active');
}

updateLobbyDisplay();
renderSelectionLists();
