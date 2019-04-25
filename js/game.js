var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pong = {};




function Paddle(name) {
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 100;
    this.name = name;
    this.score = 0;
    this.offset = 7;
    this.keyUp = false;
    this.keyDown = false;
    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
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
                ball.vy--; }
            if (pong.players[i].keyDown) {
                ball.vy++; }
        }

    }

}

function calculateScore() {
    if (ball.x + ball.radius < 0) {
        pong.players[1].score++;
        setPositions();
    }
    if (ball.x - ball.radius > canvas.width) {
        pong.players[0].score++;
        setPositions();
    }
}

function displayScore() {
    ctx.fillStyle = "#000000";
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
}





initGame();
// play();













