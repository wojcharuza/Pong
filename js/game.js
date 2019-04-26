

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
    this.pause = false;
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
    } else if (e.key === ' ') {
        pong.pause = !pong.pause;
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
            if (pong.players[i].keyUp || pong.players[i].keyDown) {
                if(ball.vy > 0){
                    ball.vy -= 2;
                }
                else{
                    ball.vy += 2;
                }
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
        setPositions();
        pong.pause = !pong.pause;


    }
    if (ball.x - ball.radius > canvas.width) {
        pong.players[0].score++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setPositions();
        pong.pause = !pong.pause;
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

function displayPause() {
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("press space to continue", canvas.width / 2, canvas.height / 2);
}


function play() {
    if (!pong.pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        moveElements();
        calculateScore();
        displayScore();
        requestAnimationFrame(play);
        let faster = setTimeout(increaseVelocity, 5000);
        if (ball.vx > 5 || ball.vy > 5) {
            clearTimeout(faster);

        }
    } else {
        displayPause();
    }
}
function increaseVelocity() {
    ball.vy = ball.vy + (0.001 * ball.vy);
    ball.vx = ball.vx + (0.001 * ball.vx);
}



initGame();
// play();
