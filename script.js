const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];
for (let i = 0; i < 150; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    radius: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    speedY: Math.random() * 3 + 2,
    angle: Math.random() * Math.PI * 2,
    rotation: Math.random() * 0.1 - 0.05
  });
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of pieces) {
    p.y += p.speedY;
    p.angle += p.rotation;
    p.x += Math.sin(p.angle);
    if (p.y > canvas.height) p.y = -10;
    drawPiece(p);
  }
  requestAnimationFrame(updateConfetti);
}

function drawPiece(p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.fill();
}

// Tus imágenes (puedes usar rutas locales o URLs online)
const imagePaths = [
  "imagenes/foto1.jpg",
  "imagenes/foto2.jpg",
  "imagenes/foto3.jpg",
  "imagenes/foto4.jpg"
];

let hasShownConfetti = false;
let imageIndex = 0;

const button = document.getElementById("celebrateBtn");
const floatingImagesContainer = document.getElementById("floatingImages");

button.addEventListener("click", () => {
  if (!hasShownConfetti) {
    canvas.style.display = "block";
    updateConfetti();
    hasShownConfetti = true;
  } else {
    if (imageIndex < imagePaths.length) {
      addFloatingImage(imagePaths[imageIndex]);
      imageIndex++;
    } else {
      alert("¡Ya salieron todas las imágenes sorpresa! 🎉");
    }
  }
});

function addFloatingImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "floating-img";

  // Posición inicial aleatoria
  img.style.top = `${Math.random() * 80 + 10}%`;
  img.style.left = `${Math.random() * 80 + 10}%`;

  floatingImagesContainer.appendChild(img);
}
