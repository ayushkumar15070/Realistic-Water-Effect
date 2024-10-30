const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the container
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create image for the background
const img = new Image();
img.src = 'https://images.pexels.com/photos/1350197/pexels-photo-1350197.jpeg?auto=compress&cs=tinysrgb&w=600';

img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setupWaterEffect();
};

// Ripple data and variables
const rippleSize = 2;
let ripples = [];

class Ripple {
      constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 50 + 50; // Randomize max size for variety
            this.opacity = 1;
      }

      update() {
            this.radius += rippleSize;
            this.opacity -= 0.015; // Fade effect as the ripple expands
      }

      draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
      }
}

function setupWaterEffect() {
      // Handle mouse movements to create ripple effects
      canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripples.push(new Ripple(x, y));
      });

      animate();
}

// Animate the ripples
function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Re-draw background image

      ripples.forEach((ripple, index) => {
            ripple.update();
            ripple.draw();
            if (ripple.opacity <= 0) {
                  ripples.splice(index, 1); // Remove ripples that are fully faded
            }
      });

      requestAnimationFrame(animate);
}
