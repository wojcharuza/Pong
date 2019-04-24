var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    offsetY: 0,
    radius: 25,
    color: 'blue',
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


    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius <= 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.radius === canvas.width || ball.x - ball.radius === 0) {

        console.log("koniec");
    }
}