let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    triangles = [],
    circles = [],
    rectangles = [];

const color = [
  '#b4aef7',
  '#64deeb',
  '#646eee',
  '#ee9cdf'
];

class Rect {
    constructor (x, y, width, height, r, color) {
      this.x = getRandomInWidth();
      this.y = getRandomInHeight();
      this.width = getRandom(10, 20);
      this.height = getRandom(10, 20);
      this.r = Math.floor(getRandom(10, 100) * (2 * Math.PI));
      this.color = getRandomColor();
      this.position = vec2.fromValues(this.x, this.y);
      let vx = getRandom(-1, 2),
          vy = getRandom(-1, 2);

      this.velocity = vec2.fromValues(vx, vy);
    }

    render() {
      ctx.beginPath();
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.translate(this.position[0], this.position[1]);
      ctx.rotate(this.r);
      ctx.rect(0, 0, this.width, this.height);
      ctx.fill();
      ctx.restore();
      ctx.closePath();
    }

    update() {
      if (this.position[0] > canvasWidth) {
          this.position[0] = canvasWidth;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      else if (this.position[0] < 0) {
          this.position[0] = 0;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      if (this.position[1] > canvasHeight){
        this.position[1] = canvasHeight;
        this.velocity[1] = this.velocity[1] * (-1);
      }
      else if (this.position[1] < 0 ) {
        this.position[1] = 0;
        this.velocity[1] = this.velocity[1] * (-1);
      }
      console.log(this.velocity[1]);
      vec2.add(this.position, this.position, this.velocity);
    }
}

class Circle {
    constructor (x, y, radius, color) {
      this.x =  getRandomInWidth();
      this.y = getRandomInHeight();
      this.radius = getRandom(5, 15);
      this.color = getRandomColor();
      this.position = vec2.fromValues(this.x, this.y);
      let vx = getRandom(-1, 2),
          vy = getRandom(-1, 2);

      this.velocity = vec2.fromValues(vx, vy);
    }

    render() {
      ctx.beginPath();
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.translate(this.position[0], this.position[1]);
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
      ctx.closePath();
    }

    update() {
      if (this.position[0] > canvasWidth) {
          this.position[0] = canvasWidth;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      else if (this.position[0] < 0) {
          this.position[0] = 0;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      if (this.position[1] > canvasHeight){
        this.position[1] = canvasHeight;
        this.velocity[1] *= -1;
      }
      else if (this.position[1] < 0 ) {
        this.position[1] = 0;
        this.velocity[1] *= -1;
      }
      vec2.add(this.position, this.position, this.velocity);
    }
}

class Triangle {
    constructor(x, y, width, r, color) {
      this.x = getRandomInWidth();
      this.y = getRandomInHeight();
      this.width = getRandom(10, 25);
      this.color = getRandomColor();
      this.r = Math.floor(getRandom(10, 100) * (2 * Math.PI));
      this.position = vec2.fromValues(this.x, this.y);
      let vx = getRandom(-1, 5),
          vy = getRandom(-1, 5);

      this.velocity = vec2.fromValues(vx, vy);
    }

    render() {
      ctx.beginPath();
      ctx.save();

      ctx.translate(this.position[0], this.position[1]);

      ctx.fillStyle = this.color;
      ctx.rotate(this.r);
      ctx.moveTo(0, 0);
      ctx.lineTo(0 + this.width , 0);
      ctx.lineTo(0 + this.width / 2, 0 + this.width);
      ctx.fill();
      ctx.restore();
      ctx.closePath();
    }

    update() {
      if (this.position[0] > canvasWidth) {
          this.position[0] = canvasWidth;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      else if (this.position[0] < 0) {
          this.position[0] = 0;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      if (this.position[1] > canvasHeight){
        this.position[1] = canvasHeight;
        this.velocity[1] *= -1;
      }
      else if (this.position[1] < 0 ) {
        this.position[1] = 0;
        this.velocity[1] *= -1;
      }
      vec2.add(this.position, this.position, this.velocity);
    }
}

function getRandom(min, max){
  return Math.floor(Math.random() * max + min);
}

function getRandomInWidth(){
    return getRandom(0, canvasWidth);
}

function getRandomInHeight(){
    return getRandom(0, canvasHeight);
}

function getRandomColor() {
    const index = getRandom(0,4);
    return color[index];
}


function init() {
    for (let i = 0; i < 50; i++) {
      let rect = new Rect();
      // rect.render();
      rectangles.push(rect);

      let circle = new Circle();
      // circle.render();
      circles.push(circle);

      let triangle = new Triangle();
      // triangle.render();
      triangles.push(triangle);
    }
}

function updateFrame() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < triangles.length; i++) {
      var t = triangles[i];
      t.update();
      t.render();
    }

    for (let i = 0; i < circles.length; i++) {
      var c = circles[i];
      c.update();
      c.render();
    }

    for (let i = 0; i < rectangles.length; i++) {
      var r = rectangles[i];
      r.update();
      r.render();
    }

    requestAnimationFrame(updateFrame);
}

init();
updateFrame();


// ctx.rect(20,20, 500, 500);


//Opacity (do not forget to put it back to 1):
//ctx.globalAlpha = .2

// ctx.arc(150,150,70,20,10);



//ctx.drawImage(img, x, y, width, height, dx, dy, dwidth, dheight);
