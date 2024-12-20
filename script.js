const canvas = document.getElementById('memoryGame');
const ctx = canvas.getContext('2d');

const tileSize = 200;
const tilesPerRow = 4;
const totalTiles = tilesPerRow * tilesPerRow;

const colors = [
  'red', 'blue', 'green', 'yellow',
  'purple', 'orange', 'cyan', 'pink',
];

const doubledColors = [...colors, ...colors];
let shuffledColors = doubledColors.sort(() => Math.random() - 0.5);

const tiles = [];
let revealedTiles = [];
let matchedTiles = 0;

for (let i = 0; i < totalTiles; i++) {
  const x = (i % tilesPerRow) * tileSize;
  const y = Math.floor(i / tilesPerRow) * tileSize;
  tiles.push({ x, y, color: shuffledColors[i], revealed: false });
}

function drawTile(tile) {
  ctx.fillStyle = tile.revealed ? tile.color : '#3a3a3a';
  ctx.fillRect(tile.x, tile.y, tileSize, tileSize);
  ctx.strokeStyle = '#555';
  ctx.strokeRect(tile.x, tile.y, tileSize, tileSize);
}

function drawBoard() {
  tiles.forEach(drawTile);
}

function getClickedTile(x, y) {
  return tiles.find(
    tile => x >= tile.x && x < tile.x + tileSize && y >= tile.y && y < tile.y + tileSize
  );
}

function checkMatch() {
  if (revealedTiles.length === 2) {
    const [first, second] = revealedTiles;
    if (first.color === second.color) {
      matchedTiles += 2;
      revealedTiles = [];

      if (matchedTiles === totalTiles) {
        setTimeout(() => alert('You win!'), 500);
      }
    } else {
      setTimeout(() => {
        first.revealed = false;
        second.revealed = false;
        revealedTiles = [];
        drawBoard();
      }, 1000);
    }
  }
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clickedTile = getClickedTile(x, y);

  if (clickedTile && !clickedTile.revealed && revealedTiles.length < 2) {
    clickedTile.revealed = true;
    revealedTiles.push(clickedTile);
    drawBoard();
    checkMatch();
  }
});

drawBoard();
