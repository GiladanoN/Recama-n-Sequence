
class SquareletClass extends VehicleClass
{
  constructor(tile,i) {
    super();    // VehicleClass.call(1,2);
    this.tile = tile;
    this.index = i;
    this.setNewPos();
    this.setNewDest();
    this.label = char(65+i);
    // Vehicle.call(this.pos.x, this.pos.y);
  }

  setNewPos() {
    let p = this.calcTargetVec();
    this.setPos(p.x, p.y);
  }

  setNewDest() {
    let p = this.calcTargetVec();
    this.setTarget(p.x, p.y);
    this.arrived = false;
  }

  show() {
    let _w = this.tile.w;
    let _x = this.pos.x;
    let _y = this.pos.y;
    // colorMode(RGB,255);
    // fill(0,0,0,70);
    fill(0);
    rect(_x, _y, _w, _w);
    super.show();
  }

  update() {
    super.update();
    this.checkArrived();
  }

  checkArrived() {
    let p = this.pos;
    let t = this.target;
    this.arrived = (
      round(p.x) == round(t.x) &&
      round(p.y) == round(t.y)
    );
  }

  calcTargetVec() {
    let tileDir = this.tile.dir;
    let _w = this.tile.w;
    let target = createVector(_w,_w);
    let match;

    // console.log(this);

    let roller = this.index + this.tile.dir;
    // roller %= this.tile.squarelets.length;
    // if (this.tile.dir == 0)
    //   roller+=2;
    roller %= 3;
    console.log(
      this.index + ": " +
      this.tile.dir + "," +
      roller
    );

    switch (roller) {
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

}
