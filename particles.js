let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    particles = [];

function getRandom(min, max){
  return Math.floor(Math.random() * max + min);
}

function getRandomInWidth(){
    return getRandom(0, canvasWidth);
}

function getRandomInHeight(){
    return getRandom(0, canvasHeight);
}

class Particle {
    constructor (x, y, radius, color) {
      this.x =  getRandomInWidth();
      this.y = getRandomInHeight();
      this.radius = 3;
      this.color = '#fff';
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
      } else if (this.position[0] < 0) {
          this.position[0] = 0;
          this.velocity[0] = this.velocity[0] * (-1);
      }
      if (this.position[1] > canvasHeight){
        this.position[1] = canvasHeight;
        this.velocity[1] *= -1;
      } else if (this.position[1] < 0 ) {
        this.position[1] = 0;
        this.velocity[1] *= -1;
      }

      vec2.add(this.position, this.position, this.velocity);

        var pos1 = {
          x : this.position[0],
          y : this.position[1]
        }

        for (let k = 0; k < particles.length; k++) {
          var pos2 = {
            x : particles[k].position[0],
            y : particles[k].position[1]
          }

          var distanceX = pos1.x - pos2.x,
              distanceY = pos1.y - pos2.y,
              distanceMax = 200,
              dist = Math.sqrt( distanceX * distanceX + distanceY * distanceY);

          if (dist  < distanceMax) {
            ctx.globalAlpha = 1 - (dist / distanceMax);
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            ctx.stroke();
            ctx.closePath();
          }
      }
    }
}

function init() {

    for (let i = 0; i < 125; i++) {

      let particle = new Particle();
      // circle.render();
      particles.push(particle);
    }
}

function updateFrame() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    var oldX, oldY;


    for (let i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update();
      p.render();
    }

    requestAnimationFrame(updateFrame);
}

init();
updateFrame();
