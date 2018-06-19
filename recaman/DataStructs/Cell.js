
let Cell = function(i,j) {

  this.index = {
    r: i, c: j
  }

  this.visited = false;
  this.current = false;

  this.Walls = {
    up:    true,
    right: true,
    down:  true,
    left:  true
  }
  this.breakWall = function(dir) {
    this.Walls[dir] = false;
  }

  this.neighbours = [];
  this.addNeighbour = function(n) {
    this.neighbours.push(n);
  }

  this.removeWall = function(dir) {
    this.Walls[dir] = false;
  }

}


/// DRAW CELL Functions

Cell.prototype.draw = function (scl) {
  push();
    this.placeSelf(scl);
    this.drawSelf(scl);
    this.drawWalls(scl);
  pop();
};

Cell.prototype.placeSelf = function (scl) {
  let xoff = this.index.c * scl;  // col => right/left
  let yoff = this.index.r * scl;  // row => up/down
  translate(xoff, yoff);
}

Cell.prototype.drawSelf = function (scl) {
  push();
    this.colorCode();
    noStroke();
    rect(0,0,scl,scl);
  pop();
}

Cell.prototype.colorCode = function () {
  if (this.current)
    fill(255,180,255,255);  // current cell
  else if (this.visited)
    fill(255,100,255);    // visited cell
  else
    fill(255,100,255,150);  // regular cell
};


Cell.prototype.drawWalls = function (v) {
  push();
    // fill(0);
    // strokeWeight(1);
    if (this.Walls.up)    line (0,0 , v,0);  // top
    if (this.Walls.right) line (0,v , v,v);  // right
    if (this.Walls.down)  line (v,v , 0,v)   // bottom
    if (this.Walls.left)  line (0,v , 0,0)   // left
  pop();

}
