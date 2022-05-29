let img;
let bullets = [];
let ememies = [];
let stars = [];
let t = 0;
let sc = 0;
let j = 0;
let h=0;
let gameState = false;
let ani = false;

function preload(){
    img = loadImage('spaceship.png');
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
            stars.splice(stars.indexOf(star), 1);
        }
    }
    for(let bullet of bullets){
        fill(245, 139, 44);
        circle(bullet.x, bullet.y, 5);
        bullet.y -= speed;
    }
    if(gameState === true){
        createEmemy();
        for(let ememy of ememies){
            ememy.y += speed/10;
            fill(255,10,0);
            rect(ememy.x, ememy.y, 10, 10);
            if(dist(ememy.x, ememy.y) < height){
                ememies.splice(ememies.indexOf(ememy),1);
            }
        }
    }
    for(let ememy of ememies){
        for(let bullet of bullets){
            if(dist(ememy.x, ememy.y, bullet.x, bullet.y) < 15){
                ememies.splice(ememies.indexOf(ememy), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
                sc += 10;
            }
            if(ememies.length == 0){
                t = 0;
                j++;
                createEmemy();
            }
            textSize(12);
            text(ememies.length,10 ,40);
        }
    }
    drawPlayer(img,mouseX,height,size);
    playerScore(sc);
    startScreen();
    if(ani == true){
        animation();
    }
    //ellipse((mouseX-20), (height-100), 2, 2);
}

function mousePressed(){
    let bullet = {
        x : mouseX,
        y : height-50
    }
    bullets.push(bullet);
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
    let level = [20,40,50,60,65];
    if(t === 0){
        for(let i=0;i<10;i++){
            let eme = {
                x : level[j]*(i+1), //start then repeat the rect
                y : -10,
            }
            t += 1;
            ememies.push(eme);
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
    if(keyCode === 32){
        gameState = true;
    }
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

function startScreen(){
    textSize(32);
    textAlign(CENTER);
    fill(255, 0, 0);
    let msg = "Press P to Start the Game."
    text(msg, width/2, h);
}

function animation(){
    if(h < height+50){
        h += speed/5;
    }
}