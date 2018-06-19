
let states;// = [UP, RIGHT, DOWN, LEFT];
const initState = 0;

function tile(w) {

  this.dir = initState;
  this.w = w;
  this.squarelets = this.initSq();
  // this.sqV = getTargetVector(this);

  this.totalW = function() {
    return this.w * 3;
  }
  // this.show = function() {
  //   push();
  //     translate(width/2, height/2);
  //
  //     this.sqV = getTargetVector(this);
  //     let _w = this.w;
  //     fill(255);
  //     rect(0,0, _w*3, _w*3);
  //
  //     fill(0);
  //     for(i=0; i<this.sqV.length; i++) {
  //       let sq = this.sqV[i];
  //       rect(sq.x, sq.y, _w, _w);
  //       // console.log("#"+i, sq.x, sq.y);
  //     }
  //
  //   pop();
  // }

  this.iter = function() {
    this.dir++;
    if (this.dir >= C.states.length) {
      this.dir = 0;
      this.rollAllSq();
    }
    // this.dir %= C.states.length;
    for (sqr of this.squarelets)
      sqr.setNewDest();
  }

  this.arrived = function() {
    for (sqr of this.squarelets)
      if (!sqr.arrived)
        return false;
    return true;
  }

}

tile.prototype.show = function() {
  let tileW = this.totalW();
  push();
    translate(width/2, height/2);

    rectMode(CENTER);
    rect(0,0, tileW, tileW);  // tile area
    // this.testMarkers();

    for (sqr of this.squarelets)
      sqr.show();
  pop();
}

tile.prototype.update = function () {
  for (sqr of this.squarelets)
    sqr.update();
};

tile.prototype.testMarkers = function() {
  push();
    let tileW = this.totalW();
    let _w = this.w;
    translate(-tileW/2, -tileW/2);
    rectMode(CORNER);
    for (let y=0; y<3; y++)
    for (let x=0; x<3; x++) {
      // noStroke();
      rect(x*_w,y*_w,_w,_w);
      text(x+","+y, x*_w+8,y*_w+20);
    }
  pop();
}


tile.prototype.initSq = function() {
  newSquarelets = [];
  for (i=0; i<3; i++) {
    newSquarelets.push(
      new SquareletClass(this,i)
    );
  }
  return newSquarelets;
}

tile.prototype.rollAllSq = function() {
  for (sqr of this.squarelets) {
    sqr.index++;
    sqr.index %= 3;
  }
};

// tile.prototype.draw = function () {
//
// };
