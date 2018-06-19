
let scl, parts;
let w, h;
// let userDivs = (GetURLParameter('divs'));
// if (userDivs && userDivs >= 5)
//   divC = userDivs;
// xm=0;
// let x=0, y=0;

let saneFloater;
let bg;

// let k = 0;
// let numbers = [];
//
// let c, n;
let r;

function setup()
{
  scl = 20;
  h = scl*20;
  w = 1000;

  createCanvas(w+1,h+1);
  bg = initBackground();

  // numbers[0] = 0;
  // c = 0;
  // k = 1;
  r = Recaman(50);

  frameRate(2);

  // colorMode(HSB, 255, 100, 100, 10);
  // C = new constants();
  // t = new tile(30);

  addLoopButton(20, height+20);
  saneFloater = new Floater(w+1,h+1);

}

function initBackground() {
  bg = createGraphics(w+1,h+1)
  bg.scale(0.5)
    .background(0)
    .stroke(255);
  bg.line(0,h/2, w,h/2)
  let y = h/2 - scl/4;
  for (let x=0; x<=w; x+=scl)
    bg.line(x,y, x,y+scl/2);
  return bg;
}

let u = true;
function draw()
{
  image(bg,0,0);  // background
  // testingCrap();

  // let u = true;
  // connectNumbers(0,1,u);    u=!u;
  // connectNumbers(3,5,u);    u=!u;
  // connectNumbers(10,5,u);   u=!u;

  // c = numbers[c];
  // n = c-k;    // go back if possible
  // if (n < 0 || numbers[n])
  //   n = c+k;  // go forward otherwise
  //
  // numbers[n] = k;

  for (let i=1; i<r.length; i++) {
    connectNumbers(r[i-1],r[i], u);   u=!u;
  }
  // console.log(c,n);

  // c = n;
  // k++;

  saneFloater.do();

  // background(57);
  // rectMode(CENTER);
  // translate(width/2-totalW/2, height/2);
  // xm+=1;
}

function connectNumbers(cur, next, under) {
  push();
    noFill();
    ellipseMode(CORNER);
    stroke(255);
    translate(0, h/2-scl/2);  // mid screen/line

    if (next < cur)
      [next,cur] = [cur,next]   // swap

    let d = next - cur;
    let x = cur * scl;
    let y = -scl*(d-1)/2;
    let a = scl * d;

    // draw arc under-or-over the line
    if (under)
      arc(x,y, a,a, 0, PI);
    else
      arc(x,y, a,a, -PI, 0);

  pop();
}

function testingCrap() {
  fill(255);
  ellipseMode(CORNER);
  ellipse(50,80, 2,2);
  ellipse(150,80,2,2);

  line(20,90,250,90);

  stroke(255);
  let k = 1, d=2;
  noFill();
  ellipse(50,80 - scl*(k-1)/2, 2,2);
  arc(50,80 - scl*(d*k-1)/2, scl*d*k,scl*d*k, 0, PI); k++;  d=2
  arc(50,80 - scl*(d*k-1)/2, scl*d*k,scl*d*k, 0, PI); k++;  d=3
  arc(50,80 - scl*(d*k-1)/2, scl*d*k,scl*d*k, 0, PI); k++;
  //
  k=1;
  arc(150,80 - scl*(k-1)/2, scl*k,scl*k, -PI, 0); k++;
  arc(150,80 - scl*(k-1)/2, scl*k,scl*k, -PI, 0); k++;
  arc(150,80 - scl*(k-1)/2, scl*k,scl*k, -PI, 0); k++;

}

// let c;
// function setFillByIndex(i,j) {
//   c = (curOff*10) % 255;
//   if(i%2==0) { c += 128; c %= 255; }
//   if(j%2==1) { c += 32; c %= 255; }
//   // fill(c,80,100,5);
//   fill(c,80,100,8);
// }
