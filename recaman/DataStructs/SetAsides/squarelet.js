
squarelet.prototype = Object.create(Vehicle.prototype);

function squarelet(tile,i)
{
  this.tile = tile;
  this.index = i;
  // this.pos = P5.vector2D();  // calc by index at init
  this.pos = this.targetVec();

  Vehicle.call(this.pos.x, this.pos.y);
  this.v = new Vehicle(this.pos.x, this.pos.y);

  this.setNewDest = function() {
    this.v.target = this.targetVec();
    this.pos = this.targetVec();
  }

  this.show = function() {
    let _w = tile.w;
    let _x = this.pos.x;
    let _y = this.pos.y;
    // colorMode(RGB,255);
    // fill(0,0,0,70);
    fill(0);
    rect(_x, _y, _w, _w);
    this.v.show();
  }

}

squarelet.prototype.update = function () {
  this.v.update();
};

squarelet.prototype.targetVec = function () {
  let tileDir = this.tile.dir;
  let _w = this.tile.w;
  let target = createVector(_w,_w);
  let match;

  switch (this.index) {
    case 1:
      match = C.MID;  // second sq'let
      break;
    case 0:
      match = C.states[tileDir]; // first
      break;
    case 2:
      tileDir--;
      if (tileDir < 0)
        tileDir = C.states.length-1;  // third
      match = C.states[tileDir];
      break;
  }
  target.x *= match.x;
  target.y *= match.y;
  return target;
};

// squarelet.prototype.AllTargetVec = function(tile) {
//   let vRes = [];
//   let sq1, sq2, sq3;
//
//   let l = C.states.length;
//   let d1 = tile.dir % l;
//   let d2 = (tile.dir+1) % l;
//
//   sq2 = createVector(0,0);
//   sq1 = p5.Vector.mult(C.states[d1],this.tile.w);
//   sq3 = p5.Vector.mult(C.states[d2],this.tile.w);
//
//   vRes.push(sq1, sq2, sq3);
//   console.log(vRes);
//   // console.log(vRes);
//   return vRes;
// }
