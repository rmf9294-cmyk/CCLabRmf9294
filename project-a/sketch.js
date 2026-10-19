let blood = false;
let creatureX = 400;
let creatureY = 250;

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (blood === false) {
      blood = true;
    } else if (blood === true) {
      blood = false;
    }
  }
}
//tiny creatures
let smallX = [100, 650, 200, 700];
let smallY = [100, 350, 400, 150];
let smallZ = [100, 650, 200, 700];
let smallZZ = [100, 350, 400, 150];
function setup() {
  noCursor();
  createCanvas(800, 500);
}

function draw() {
   drawBackground();
 if (blood) {
    noStroke();
    fill(180, 0, 0);

  for (let i = 0; i < 50; i++) {
    ellipse(random(800), random(500), 8, 8);
  }
}


  // Move towards the mouse
  creatureX = creatureX + (mouseX - creatureX) * 0.025;
  creatureY = creatureY + (mouseY - creatureY) * 0.025;
drawSmallCreatures();

  drawCreature(creatureX, creatureY);
}

function drawCreature(x, y) {
  push();
  noStroke();
fill(255, 220, 0);
ellipse(mouseX, mouseY, 25, 25);
  translate(x, y);

  drawTail(0, 75);

  // Eight moving leaves
  
  for (let i = 0; i < 8; i++) {
    // let angleArm = i * 5;
    let speed = dist(mouseX, mouseY, creatureX, creatureY) < 30 ? 5 : 1;/// creds to yt
    
let angleArm = i * 45 + frameCount * speed * 0.02;
    let movement = sin(frameCount * 2 + i * 45) * 0.001;
    drawArm(0, 0, 125, angleArm + movement);
  }
  drawAntenna(-30, -75, -20);



  // Pulsating body
  let pulse = 1 + sin(frameCount * 2) * 0.04;
  drawBody(0, 0, 155 * pulse);

  pop();
  
 

}

function drawBody(x, y, size) {
  push();
  translate(x, y);

  // Outer hole
  stroke(255, 175, 80);
  strokeWeight(4);
  fill(105, 30, 65);
  ellipse(0, 0, size, size * 1.1);

  // inside core
  noStroke();
  fill(185, 55, 90);
  ellipse(0, 0, size * 0.78, size * 0.86);

 
// Pulsating hole
let nucleusSize = 32 + sin(frameCount * 4) * 8;

let distance = dist(mouseX, mouseY, creatureX, creatureY);

if (distance < nucleusSize / 2) {
  fill(255, 0, 0); // red when mouse is over the nucleus
} else {
  fill(255, 215, 120); // Original colour
}

ellipse(0, 0, nucleusSize, nucleusSize);

  pop();
}

function drawArm(x, y, len, angleArm) {
  push();
  translate(x, y);
  rotate(angleArm);

  stroke(255, 175, 80);
  strokeWeight(3);
  fill(185, 65, 80);

  beginShape();
  vertex(45, -20);
  vertex(len * 0.45, -28);
  vertex(len * 0.75, -17);
  vertex(len, 0);
  vertex(len * 0.75, 17);
  vertex(len * 0.45, 28);
  vertex(45, 20);
  endShape(CLOSE);

  // Spikes
  stroke(255, 215, 115);
  strokeWeight(3);

  for (let i = 1; i <= 4; i++) {
    let px = 45 + i * (len - 45) / 5;
    line(px, -18, px + 5, -32);
    line(px, 18, px + 5, 32);
  }

  noStroke();
  fill(255, 115, 155);
  ellipse(len, 0, 12, 12);

  pop();
}

  
function drawAntenna(x, y, angleAntenna) {
  push();
  
  translate(x, y);
  rotate(angleAntenna + sin(frameCount * 2 + x) * 5);

  stroke(255, 175, 100);
  strokeWeight(4);
  noFill();

  beginShape();
  vertex(0, 0);
  vertex(-8, -18);
  vertex(8, -35);
  vertex(0, -52);
  endShape();

  noStroke();
  fill(255, 100, 155);
  ellipse(0, -52, 16, 16);

  pop();
}

function drawTail(x, y) {
  push();
  translate(x, y);

  let growth = 1 + sin(frameCount * 1.5) * 0.12;
  let sway = sin(frameCount * 0.5) * 8;

  stroke(255, 175, 80);
  strokeWeight(4);
  fill(140, 40, 75);

  beginShape();
  vertex(-25, 0);
  vertex(-33, 25);
  vertex(-20 + sway, 55 * growth);
  vertex(sway, 100 * growth);
  vertex(20 + sway, 55 * growth);
  vertex(33, 25);
  vertex(25, 0);
  endShape(CLOSE);

  stroke(255, 210, 125);
  strokeWeight(2);
  line(-12, 15, sway, 70 * growth);
  line(12, 15, sway, 70 * growth);


  pop();
}
/// background from previous code
function drawBackground() {
  background(20, 15, 30,25);
  randomSeed(10);

  // Heat waves
  noFill();
  stroke(100, 70, 130, 55);
  strokeWeight(1.5);

  for (let y = 15; y < 500; y += 25) {
    beginShape();

    for (let x = 0; x <= 800; x += 8) {
      let wave = sin(x * 0.025 + y * 0.03) * 15;
      vertex(x, y + wave);
    }

    endShape();
  }

  // Spirals
  noFill();
  stroke(190, 60, 180, 100);
  strokeWeight(2);

  for (let i = 0; i < 4; i++) {
    let cx = 120 + i * 180;
    let cy = random(100, 400);

    for (let r = 15; r < 100; r += 10) {
      beginShape();

      for (let angle = 0; angle < TWO_PI * 2; angle += 0.06) {
        let distortion = sin(angle * 3 + r * 0.05) * 6;
        
        let x = cos(angle) * (r + distortion);
        let y = sin(angle) * (r + distortion) * 0.5;

        vertex(cx + x, cy + y);
      }

      endShape();
    }
  }

  // Random buzzing
  stroke(230, 100, 200, 100);
  strokeWeight(1);

  for (let i = 0; i < 450; i++) {
    let x = random(0, 400);
    let y = random(0, 500);
    let length = random(2, 10);

    line(x, y, x + length, y);
    line(800 - x, y, 800 - x - length, y);
  }

  // Glowing particles
  noStroke();

  for (let i = 0; i < 100; i++) {
    let x = random(0, 400);
    let y = random(0, 500);
    let size = random(1, 4);

    fill(200, 90, 210, 100);
    ellipse(x, y, size, size);
    ellipse(800 - x, y, size, size);
  }
}

function drawSmallCreatures() {
  for (let i = 0; i < 4; i++) {
    fill(255, 220, 200);
    noStroke();

    ellipse(smallX[i], smallY[i], 12, 12);
     fill(255,70, 0);
    ellipse(smallZ[i], smallY[i], 12, 12);
    ellipse(smallZZ[i], smallY[i], 12, 12);
    ellipse(smallX[i] - 7, smallY[i] - 5, 6, 6);

    smallX[i] = smallX[i] + 1;

    if (smallX[i] > 800) {
      smallX[i] = 0;
    }
  }
}
