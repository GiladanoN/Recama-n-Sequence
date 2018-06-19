
let MazeGenerator = function(maze, start) {
  this.maze = maze;
  this.trace = [];
  // this.current = start;

  this.visitCounter = 0;
  this.total = maze.size.rows * maze.size.cols;

  this.cur;
  this.setCurrent = function(cur) {
    if (this.cur)
      this.get().current = false;
    this.cur = cur;
    this.get().current = true;
  }
}

// MazeGenerator.prototype.iterate = function () {
// };

MazeGenerator.prototype.visit = function () {
  let cell = this.get();
  if (cell.visited)
    return;
  cell.visited = true;
  this.visitCounter++;
}

MazeGenerator.prototype.done = function() {
  return (this.visitCounter == this.total);
}

MazeGenerator.prototype.get = function(whr) {
  if (!whr) whr = this.cur;
  return this.maze.getCell(whr.r, whr.c);
}

MazeGenerator.prototype.connect = function(cur, nbr) {
  let diff;
  if (cur.r == nbr.r) {   // right-left neighbours
    diff = nbr.c - cur.c;
    if (diff == 1) {
      this.get(cur).removeWall('right');  // cur then nbr
      this.get(nbr).removeWall('left');
    }
    else if (diff == -1) {
      this.get(cur).removeWall('left');   // nbr then cur
      this.get(nbr).removeWall('right');
    }
  }
  else if (cur.c == nbr.c) {  // up-down neighbours
    diff = nbr.r - cur.r;
    if (diff == 1) {
      this.get(cur).removeWall('down');  // cur then nbr
      this.get(nbr).removeWall('up');
    }
    else if (diff == -1) {
      this.get(cur).removeWall('up');    // nbr then cur
      this.get(nbr).removeWall('down');
    }
  }

}


// 1.	Make the initial cell the current cell and mark it as visited
// 2.	While there are unvisited cells
//   1.	If the current cell has any neighbours which have not been visited
//     1.	Choose randomly one of the unvisited neighbours
//     2.	Push the current cell to the stack
//     3.	Remove the wall between the current cell and the chosen cell
//     4.	Make the chosen cell the current cell and mark it as visited
//   2.	Else if stack is not empty
//     1.	Pop a cell from the stack
//     2.	Make it the current cell
