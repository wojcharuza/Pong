
function Paddle(name) {
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 100;
    this.name = name;
    this.score = 0;
    this.offset = 10;
    this.keyUp = false;
    this.keyDown = false;
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}


function initGame() {
    pong.players = [];
    pong.players[0] = new Paddle('Player 1');
    pong.players[1] = new Paddle('Player 2');
    setPositions();
}



function setPositions() {
    pong.players[0].x = 0;
    pong.players[1].x = canvas.width - pong.players[1].width;
    pong.players[0].y = (canvas.height - pong.players[0].height)/2;
    pong.players[1].y = (canvas.height - pong.players[1].height)/2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vy = generateVelocity();
    ball.vx = generateVelocity();
}

function isBallPaddleColliding(paddle,ball){
    let dx = Math.abs(ball.x - (paddle.x + paddle.width / 2));
    let dy = Math.abs(ball.y - (paddle.y + paddle.height / 2));
    if( dx > ball.radius+paddle.width/2 ){ return(false); }
    if( dy > ball.radius+paddle.height/2 ){ return(false); }
    if( dx <= paddle.width ){ return(true); }
    if( dy <= paddle.height ){ return(true); }
    dx = dx - paddle.width;
    dy = dy - paddle.height;
    return(dx*dx+dy*dy<=ball.radius*ball.radius);
}


function isBallObstacleColliding(obstacle,ball){
    let dx=ball.x-obstacle.x;
    let dy=ball.y-obstacle.y;
    let rSum=obstacle.radius+ball.radius;
    return(dx*dx+dy*dy<=rSum*rSum);
}


function keyDownHandler(e) {
    if (e.key === 'a') {
        pong.players[0].keyUp = true;
    }

    else if (e.key === 'k') {
        pong.players[1].keyUp = true;
    }

    else if (e.key === 'z') {
        pong.players[0].keyDown = true;
    }

    else if (e.key == 'm') {
        pong.players[1].keyDown = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'a') {
        pong.players[0].keyUp = false;
    }

    else if (e.key === 'k') {
        pong.players[1].keyUp = false;
    }

    else if (e.key === 'z') {
        pong.players[0].keyDown = false;
    }

    else if (e.key == 'm') {
        pong.players[1].keyDown = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);



function draw() {
    pong.players[0].draw();
    pong.players[1].draw();
    drawObstacle();
    drawBall();
}

function moveElements() {
    for (i = 0; i < pong.players.length; i++) {
        if (pong.players[i].keyUp && pong.players[i].y > 0) {
            pong.players[i].y -= pong.players[i].offset;
        }

        if (pong.players[i].keyDown && pong.players[i].y + pong.players[i].height < canvas.height) {
            pong.players[i].y += pong.players[i].offset;
        }
        if (isBallPaddleColliding(pong.players[i], ball)) {
            ball.vx = -ball.vx;
            if (pong.players[i].keyUp) {
                ball.vy--;
            }
            if (pong.players[i].keyDown) {
                ball.vy++;
            }
        }
    }
    if (isBallObstacleColliding(ball, obstacle)) {
        ball.vy = -ball.vy;
        ball.vx = -ball.vx;

    }
}

function calculateScore() {
    if (ball.x + ball.radius < 0) {
        pong.players[1].score++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        alert("Player 2 win !");
        wait(1000);
        setPositions();

    }
    if (ball.x - ball.radius > canvas.width) {
        pong.players[0].score++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        alert("Player 1 win !");
        wait(1000);
        setPositions();

    }

}
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

function displayScore() {
    ctx.fillStyle = "white";
    ctx.font = "25px Courier New";
    ctx.textAlign = "left";
    ctx.fillText(pong.players[0].name + " : " + pong.players[0].score, 100, 100);
    ctx.textAlign = "right";
    ctx.fillText(pong.players[1].name + " : " + pong.players[1].score, canvas.width - 100, 100);
}


function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    moveElements();
    calculateScore();
    displayScore();
    requestAnimationFrame(play);
    let faster = setTimeout(increaseVelocity, 5000);
    if (ball.vx > 10 || ball.vy > 10) {
        clearTimeout(faster);

    }
}
function increaseVelocity() {
    ball.vy = ball.vy + (0.001 * ball.vy);
    ball.vx = ball.vx + (0.001 * ball.vx);
}

function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}

function checkCollision (ball0, ball1) {
    var dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);

    //collision handling code here
    if (dist < ball0.radius + ball1.radius) {
        //calculate angle, sine, and cosine
        var angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),

            //rotate ball0's position
            pos0 = {x: 0, y: 0}, //point

            //rotate ball1's position
            pos1 = rotate(dx, dy, sin, cos, true),

            //rotate ball0's velocity
            vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),

            //rotate ball1's velocity
            vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),

            //collision reaction
            vxTotal = vel0.x - vel1.x;
        vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
            (ball0.mass + ball1.mass);
        vel1.x = vxTotal + vel0.x;

        //update position
        pos0.x += vel0.x;
        pos1.x += vel1.x;

        //rotate positions back
        var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
            pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

        //adjust positions to actual screen positions
        ball1.x = ball0.x + pos1F.x;
        ball1.y = ball0.y + pos1F.y;
        ball0.x = ball0.x + pos0F.x;
        ball0.y = ball0.y + pos0F.y;

        //rotate velocities back
        var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
            vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
        ball0.vx = vel0F.x;
        ball0.vy = vel0F.y;
        ball1.vx = vel1F.x;
        ball1.vy = vel1F.y;
    }
}




initGame();
// play();
