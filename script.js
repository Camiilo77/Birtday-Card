const giftImage = document.getElementById("giftImage");
const message = document.getElementById("message");
let hasOpened = false;

giftImage.addEventListener("click", () => {
  if (hasOpened) return;
  hasOpened = true;

  // Mostrar mensaje
  message.classList.remove("hidden");
  setTimeout(() => {
    message.classList.add("show");
  }, 100);

  // Mostrar confeti
  startConfetti();

  // Después de 5 segundos, empezar a mostrar fotos flotantes
  setTimeout(() => {
    launchFloatingPhotos();
  }, 10000);
});

function launchFloatingPhotos() {
  const images = [
    "imagenes/foto1.jpg",
    "imagenes/foto2.jpg",
    "imagenes/foto3.jpg",
    "imagenes/foto4.jpg",
    "imagenes/foto5.png",
    "imagenes/foto6.png",
    "imagenes/foto7.png",
    "imagenes/foto8.png",
    "imagenes/foto9.jpg",
    "imagenes/foto10.jpg",
    "imagenes/foto11.jpg",
    "imagenes/foto12.jpg",
    "imagenes/foto13.jpg",
    "imagenes/foto14.jpg",
    "imagenes/foto15.jpg",
    "imagenes/foto16.jpg",
    "imagenes/foto17.jpg",
    "imagenes/foto18.jpg",
  ];

  const container = document.getElementById("photo-container");

  setInterval(() => {
    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    img.className = "floating-img";
    img.style.top = `${Math.random() * 90}%`;
    img.style.left = `${Math.random() * 90}%`;
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(img);

    setTimeout(() => {
      img.remove();
    }, 20000);
  }, 2000);
}


// 🎊 Simple confeti canvas
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();
    });

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    particles.forEach(p => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y > canvas.height) {
        p.x = Math.random() * canvas.width;
        p.y = -20;
      }
    });
  }

  draw();
}
