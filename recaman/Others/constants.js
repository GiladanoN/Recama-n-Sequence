
function constants() {
  this.UP    = createVector( 0, -1);
  this.RIGHT = createVector( 1,  0);
  this.DOWN  = createVector( 0,  1);
  this.LEFT  = createVector(-1,  0);
  this.MID   = createVector( 0,  0);

  this.states = [
    this.UP,
    this.RIGHT,
    this.DOWN,
    this.LEFT
  ];

}
