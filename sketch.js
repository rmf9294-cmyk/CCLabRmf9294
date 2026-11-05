
/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new RmfDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class RmfDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    // add properties for your dancer here:
    this.time = 0;
    this.bounce = 0;
    this.wobble = 0;
    this.wingMove = 0;
    this.step = 0;
  }

  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    this.time += 0.08;

    // Dodo bounces up and down
    this.bounce = abs(sin(this.time)) * 7;

    // Dodo wobbles from side to side
    this.wobble = sin(this.time) * 0.08;

    // Wings flap while dancing
    this.wingMove = sin(this.time * 2) * 0.4;

    // Feet move alternately
    this.step = sin(this.time);
  }

  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    noStroke();

    // DODO'S DANCING FEET
    stroke(245, 160, 40);
    strokeWeight(6);

    let leftStep = max(0, this.step) * 10;
    let rightStep = max(0, -this.step) * 10;

    // Left leg
    line(-20, 45, -20, 65 - leftStep);
    line(-20, 65 - leftStep, -38, 70 - leftStep);

    // Right leg
    line(20, 45, 20, 65 - rightStep);
    line(20, 65 - rightStep, 38, 70 - rightStep);

    noStroke();

    // MOVE THE WHOLE DODO BODY
    push();
    translate(0, -this.bounce);
    rotate(this.wobble);

    // TAIL FEATHERS
    fill(235, 220, 190);
    ellipse(-43, 15, 30, 18);
    ellipse(-46, 4, 27, 18);
    ellipse(-40, 29, 27, 18);

    // LEFT WING
    push();
    translate(-31, 3);
    rotate(-0.3 + this.wingMove);

    fill(125, 130, 160);
    ellipse(-15, 5, 40, 26);

    fill(235, 220, 190);
    ellipse(-27, 4, 20, 13);
    ellipse(-22, 13, 23, 12);
    pop();

    // RIGHT WING
    push();
    translate(31, 3);
    rotate(0.3 - this.wingMove);

    fill(125, 130, 160);
    ellipse(15, 5, 40, 26);

    fill(235, 220, 190);
    ellipse(27, 4, 20, 13);
    ellipse(22, 13, 23, 12);
    pop();

    // DODO'S ROUND BODY
    fill(105, 115, 145);
    ellipse(0, 17, 85, 90);

    // BELLY
    fill(145, 150, 175);
    ellipse(7, 28, 50, 60);

    // NECK
    fill(110, 120, 150);
    ellipse(12, -23, 43, 52);

    // ROUND HEAD
    fill(120, 130, 160);
    ellipse(13, -46, 57, 56);

    // CREAM-COLORED FACE
    fill(245, 222, 185);
    ellipse(28, -42, 30, 34);

    // FEATHERS ON TOP OF HEAD
    fill(120, 130, 160);
    ellipse(0, -73, 12, 22);
    ellipse(11, -75, 12, 23);
    ellipse(20, -72, 12, 20);

    // DODO'S EYE - ALWAYS OPEN
    fill(20);
    ellipse(31, -50, 7, 9);

    // SMALL WHITE REFLECTION
    fill(255);
    ellipse(33, -52, 2, 2);

    // LARGE DODO BEAK
    fill(250, 175, 50);
    ellipse(49, -38, 37, 23);

    // CURVED DARK TIP OF BEAK
    fill(95, 70, 60);
    arc(60, -38, 23, 32, -HALF_PI, HALF_PI);

    // NOSTRIL
    fill(140, 90, 35);
    ellipse(46, -44, 4, 3);

    // LITTLE RED BOW TIE
    fill(225, 55, 65);
    triangle(3, -10, 3, 5, 18, -2);
    triangle(30, -10, 30, 5, 18, -2);

    fill(180, 30, 45);
    ellipse(18, -2, 10, 10);

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together.

RULES:
For this to work you need to follow one rule:
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments:
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels.
*/
