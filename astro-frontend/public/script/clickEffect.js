const gifs = [
  '/click-gifs/gif1.gif',
  '/click-gifs/gif2.gif',
  '/click-gifs/gif3.gif',
];

function createGif(x, y) {
  const img = document.createElement('img');
  img.src = gifs[Math.floor(Math.random() * gifs.length)];
  img.style.position = 'fixed';
  img.style.left = x - 20 + 'px';
  img.style.top = y - 20 + 'px';
  img.style.width = `${30 + Math.random() * 30}px`; // random size 30-60px
  img.style.height = img.style.width;
  img.style.pointerEvents = 'none';
  img.style.zIndex = 9999;

  // Random trajectory
  const dx = (Math.random() - 0.5) * 200; // wider horizontal spread
  const dy = -150 - Math.random() * 100;  // more vertical movement
  const rotate = (Math.random() - 0.5) * 720; 
  const scale = 0.5 + Math.random() * 0.5;

  const duration = 2000 + Math.random() * 1000; // 2-3 seconds

  img.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
  img.style.transform = `translate(0,0) rotate(0deg) scale(1)`;

  document.body.appendChild(img);

  // Animate after next frame
  requestAnimationFrame(() => {
    img.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(${scale})`;
    img.style.opacity = 0;
  });

  // Cleanup after animation
  setTimeout(() => img.remove(), duration);
}

document.addEventListener('click', (e) => {
  const count = 5 + Math.floor(Math.random() * 5); // spawn 5-9 GIFs per click for confetti
  for (let i = 0; i < count; i++) {
    setTimeout(() => createGif(e.clientX, e.clientY), i * 50);
  }
});
