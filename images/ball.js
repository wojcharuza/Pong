

function generateVelocity() {
    var vx = 0;
    while (vx < 3 && vx > -3) {
        vx = Math.floor(Math.random() * (10) - 5);
    }
    return vx;
}

var ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    vx: 2,
    vy: 2,
    radius: 10,
    color: 'red',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function drawBall() {
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;


    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
       
    }
}