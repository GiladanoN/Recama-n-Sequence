
class VehicleClass {

  constructor() {
    this.pos = createVector(random(width), random(height));
    this.target = createVector();
    // this.vel = p5.Vector.random2D();
    this.vel = createVector();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    // this.maxforce = 1;
    this.maxforce = 0.3;
  }

  setPos(x,y) {
    this.pos = createVector(x,y);
  }
  setTarget(x,y) {
    this.target = createVector(x,y);
  }

  behaviors() {
    var arrive = this.arrive(this.target);
    arrive.mult(1);
    this.applyForce(arrive);
    // var mouse = createVector(mouseX, mouseY);
    // var flee = this.flee(mouse);
    // flee.mult(5);
    // this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.behaviors();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    push();
    stroke(80);
    // translate(-3,3);
    // text(this.label, this.pos.x, this.pos.y);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    pop();
  }


  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

}
