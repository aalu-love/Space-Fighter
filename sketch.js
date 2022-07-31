let img;
let bullets = [];
let enemies = [];
let stars = [];
let t = 0;
let sc = 0;
let j = 0;
let h=0;
let gameState = true;
let ani = false;
let shoot,gameover,collision;
let screenW = window.innerWidth;
let screenH = window.innerHeight;

function preload(){
    soundFormats('mp3','wav');
    sampleRate(1)
    shoot = loadSound('assets/shoot.mp3');
    gamemusic = loadSound('assets/Turbocharged.mp3');
    gameover = loadSound('assets/gameover.mp3');
    collision = loadSound('assets/collsion.mp3');
    player = loadImage('spaceship.png');
    ufo = loadImage('enemy.png');
    
}



function setup() {
    background(0);
    let screenWidth = screenH / 1.3;
    let screenHeight = screenH / 1.3;
    let canv = createCanvas(parseInt(screenWidth), parseInt(screenHeight));
    console.log(parseInt(screenWidth), parseInt(screenHeight));
    console.log(screenW, screenH);
    h = height/2;
    let spaceing = 5;
    let x = spaceing * 2;
    let y = spaceing * 2;
    canv.position(x,y);
    gamemusic.play();
    gamemusic.loop();
}

let x = -10;
let speed = 7;
let size = 50;

function draw() {
    background(0);
    //bounce();
    drawSpace();
    for(let star of stars){
        fill(225);
        circle(star.x, star.y, star.size);
        star.y += speed/3;
        if(dist(star.x, star.y) < (height+10)){
            stars.splice(stars.indexOf(star), 10);
        }
    }
    for(let bullet of bullets){
        fill(245, 139, 44);
        circle(bullet.x, bullet.y, 5);
        bullet.y -= speed;
    }
    if(gameState === true){
        createEmemy();
        for(let enemy of enemies){
            enemy.y += speed/10;
            image(ufo, enemy.x, enemy.y, enemy.size, enemy.size);
            if(enemy.y > height){
                startScreen("Game Over");
                gameover.play();
                gamemusic.stop();
                enemies.splice(enemies.indexOf(enemy),1);
                noLoop();
            }
        }
    }
    for(let enemy of enemies){
        for(let bullet of bullets){
            if(dist(enemy.x + (enemy.size/2), enemy.y + (enemy.size/2), bullet.x, bullet.y) < 17){
                enemies.splice(enemies.indexOf(enemy), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
                collision.play();
                sc += 10;
            }
            if(enemies.length == 0){
                t = 0;
                j++;
                createEmemy();
            }
        }
    }
    drawPlayer(player,mouseX,height,screenH);
    playerScore(sc);
    /*startScreen("Press P to Start the Game.");
    if(ani == true){
        animation();
    }*/
}

function mousePressed(){
    //shoot.volume(0.5);
    shoot.play();
    let bullet = {
        x : mouseX,
        y : height-50
    }
    bullets.push(bullet);
}

function touchStarted(){
    if(x<12){
        x += 50;
    }
    if(x > width-12){
        x = (width-50);
    }
    image(i, (x-25), (h-70), size, size);
    mousePressed();
    textSize(12);
    text((x),10, 10);
}

function drawPlayer(i,x,h,size){
    if(x<12){
        x += 50;
    }
    if(x > width-12){
        x = (width-50);
    }
    image(i, (x-25), (h-70), (size/18), (size/18));
    textSize(12);
    //text((x),10, 10);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


function createEmemy(){
    if(t === 0){
        for(let i=0;i<10;i++){
            let eme = {
                x : getRandom(15,screenH/1.4), //start then repeat the rect
                y : -10,
                size : screenH / 25,
            }
            console.log(eme.x);
            t += 1;
            enemies.push(eme);
        }
    }
}

function bounce(){
    if(x > width || x < -10){
        speed = speed * -1;
    }
    ellipse(x, height/2, 80, 80);
    x = x + speed;
}

function drawSpace(){
    let star = {
        x: random(width),
        y: -5,
        size: random(5),
    }
    stars.push(star);
}

function keyPressed(){
    if(keyCode === 80){
        ani = true;
    }
    return false;
}

function playerScore(sc){
    textSize(32);
    fill(0, 245, 24);
    textAlign(LEFT);
    text("Score: "+sc, 10, 40);
}

function startScreen(msg){
    textSize(32);
    textAlign(CENTER);
    fill(255, 0, 0);
    text(msg, width/2, h);
}

function animation(){
    if(h < height+50){
        h += speed/2;
    }else{
        gameState = true;
        createEmemy();
    }
}