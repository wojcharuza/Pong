var thumbImg = document.createElement('img');
thumbImg.src = 'images/planet2.png';





var obstacle = {
    x: canvas.width/2,
    y: canvas.height/9,
    vy: 5,
    radius: 60,
    draw: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.drawImage(thumbImg, 0, 0, this.x*2, this.y*2);
        ctx.closePath();
        ctx.restore();
    }
};

function drawObstacle() {
    obstacle.draw();
    obstacle.y += obstacle.vy;


    if (obstacle.y + obstacle.radius > canvas.height || obstacle.y - obstacle.radius < 0) {
        obstacle.vy = -obstacle.vy;
    }

}