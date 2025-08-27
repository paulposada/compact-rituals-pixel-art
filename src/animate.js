const container = document.getElementById('container');
const numberOfBalls = 100; // Número de bolas a crear
const balls = [];
let mouseX = 0;
let mouseY = 0;

// Crear las bolas con tamaño variable
for (let i = 0; i < numberOfBalls; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');

    const size = Math.random() * (55 - 10) + 10; // Tamaño aleatorio entre 10 y 55 px
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.top = `${Math.random() * (container.clientHeight - size)}px`;
    ball.style.left = `${Math.random() * (container.clientWidth - size)}px`;

    container.appendChild(ball);
    balls.push(ball);
    animateBall(ball);
}

// Escuchar el movimiento del mouse
container.addEventListener('mousemove', function (event) {
    const rect = container.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

// Animar las bolas
function animateBall(ball) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    const duration = Math.random() * 4 + 2; // Aumentar la duración para hacer el movimiento más lento

    function moveBall() {
        const newX = Math.random() * (container.clientWidth - parseFloat(ball.style.width));
        const newY = Math.random() * (container.clientHeight - parseFloat(ball.style.height));

        tl.to(ball, {
            x: `+=${newX - parseFloat(ball.style.left)}`,
            y: `+=${newY - parseFloat(ball.style.top)}`,
            duration: duration,
            ease: "power1.inOut",
            onUpdate: checkCollision
        });
    }

    function checkCollision() {
        const ballRect = ball.getBoundingClientRect();
        const ballX = ballRect.left - container.getBoundingClientRect().left + parseFloat(ball.style.width) / 2;
        const ballY = ballRect.top - container.getBoundingClientRect().top + parseFloat(ball.style.height) / 2;

        const distX = ballX - mouseX;
        const distY = ballY - mouseY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < parseFloat(ball.style.width) / 2) {
            const repulsionStrength = 20; // Fuerza de repulsión
            const angle = Math.atan2(distY, distX);
            const repelX = Math.cos(angle) * repulsionStrength;
            const repelY = Math.sin(angle) * repulsionStrength;

            gsap.to(ball, {
                x: `+=${repelX}`,
                y: `+=${repelY}`,
                duration: 0.3,
                ease: "power1.out"
            });
        }
    }

    moveBall();
}