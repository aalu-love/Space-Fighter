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

function preload(){
    player = loadImage('spaceship.png');
    ufo = loadImage('enemy.png');
    
}

function setup() {
    background(0);
    createCanvas(700, 700);
    h = height/2;
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
                sc += 10;
            }
            if(enemies.length == 0){
                t = 0;
                j++;
                createEmemy();
            }
        }
    }
    drawPlayer(player,mouseX,height,size);
    playerScore(sc);
    /*startScreen("Press P to Start the Game.");
    if(ani == true){
        animation();
    }*/
}

function mousePressed(){
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
    image(i, (x-25), (h-70), size, size);
    textSize(12);
    text((x),10, 10);
}


function createEmemy(){
    let level = [70, 60, 50, 40, 30];
    let seet = [60, 45, 65, 85, 70];
    if(t === 0){
        for(let i=0;i<10;i++){
            let eme = {
                x : level[j]+(i*seet[j]), //start then repeat the rect
                y : -10,
                size : 30,
            }
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
    fill(0, 0, 255);
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