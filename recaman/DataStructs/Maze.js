
let Maze = function(r,c) {

  this.size = {
    rows: r,
    cols: c
  }

  this.Cells;
  this.initCells = function()
  {
    let grid = generateCellGrid(
      this.size.rows, this.size.cols );
    linkAllNeighbours(grid);
    this.Cells = grid;
  }

  this.scl = DEFAULT_SCL;
  this.setScale = function(scale) {
    this.scl = isNaN(scl) ? DEFAULT_SCL : scale;
  }

  this.getCell = function(i,j) {
    return this.Cells[i][j];
  }

}

let DEFAULT_SCL = 50;
Maze.prototype.draw = function () {
  this.drawSelf();
  this.drawChildren();
};

Maze.prototype.drawSelf = function () {
  push();
    fill(255,100,255,100);
    noStroke();
    rectMode(CORNER);
    let w = this.size.rows * this.scl;
    let h = this.size.cols * this.scl;
    rect(0,0,w,h);
  pop();
}

Maze.prototype.drawChildren = function () {
  for (Row of this.Cells)
    for (Cell of Row)
      Cell.draw(this.scl);
}

// this.Cells[0][0].current = true;
// this.Cells[1][0].visited = true;
// this.Cells[2][0].visited = true;


/// GENERATE/INIT Functions

let linkAllNeighbours = function (grid) {
  for (let i=0; i<grid.length; i++)
    for (let j=0; j<grid[i].length; j++)
    {
      if (i != 0)   // link up
        grid[i][j].addNeighbour(grid[i-1][j]);

      if (j != 0)   // link left
        grid[i][j].addNeighbour(grid[i][j-1]);

      if (i != grid.length-1)     // link down
        grid[i][j].addNeighbour(grid[i+1][j]);

      if (j != grid[i].length-1)   // link right
        grid[i][j].addNeighbour(grid[i][j+1]);
    }
};

let generateCellGrid = function(rows,cols) {
  let Grid = [];
  for (let i=0; i<rows; i++) {
    let Row = [];
    for (let j=0; j<cols; j++) {
      let cell = new Cell(i,j);   // grid[row][col]
      Row.push(cell);
    }
    Grid.push(Row);
  }
  return Grid;
};
