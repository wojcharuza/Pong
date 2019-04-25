


function generateVelocity() {
    var vx = 0;
    while (vx < 3 && vx > -3) {
        vx = Math.floor(Math.random() * (20) - 10);
    }
    return vx;
}

var obstacle = {
    x: canvas.width/2,
    y: canvas.height/9,
    vy: generateVelocity(),
    radius: 60,
    color: 'yellow',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function drawObstacle() {
    obstacle.draw();
    obstacle.y += obstacle.vy;


    if (obstacle.y + obstacle.radius > canvas.height || obstacle.y - obstacle.radius < 0) {
        obstacle.vy = -obstacle.vy;
    }

}