
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

// let u = true;
let sect = 0;
function draw()
{
  image(bg,0,0);  // background / numberline
  // testingCrap();

  sect += PI/128;
  connectNumbers(3,9, sect,true);
  connectNumbers(5,17,sect,false);

  let u = true;   // if set only globaly, the animation
                  // 'flips' on even length'd arrays

  // for (let i=1; i<r.length; i++) {
  //   connectNumbers(r[i-1],r[i], u);   u=!u;
  // }

  saneFloater.do();
}

function connectNumbers(cur, next, sect, under) {
  push();
    noFill();
    ellipseMode(CORNER);
    stroke(255);
    translate(0, h/2-scl/2);  // mid screen/line

    if (next < cur)
      [next,cur] = [cur,next]   // swap input's order if wrong

    let d = next - cur;     // delta to deratmin arc's 'size'
    let s = scl * d;        // respective w/h values for arc(...)
    let x = cur * scl;      // x offset, assumes fixed layout.
    let y = -scl*(d-1)/2;   // y offset - how many 'half-steps' to fix
                            //    upwards, as arc is drawn from CORNER

    if (sect<0)  sect = 0;  // limit the section value to bounds
    if (sect>1)  sect = 1;  // (arcs may not cross the numberline!)
    sect = 1 - sect;  // invert the part of ANGLE to NOT draw

    // begin/end angles (under-or-over the numberline)
    let [b,e] = [0,-PI];  // over ^
    if (under)            // [or]
        [b,e] = [PI,0];   // under _

    // // begin/end angles (under-or-over the numberline)
    // let [b,e] = [-PI,-PI*sect];  // over ^
    // if (under)                   // [or]
    //     [b,e] = [PI*sect,PI];    // under

    arc(x,y, s,s, b, e);   // now DRAW my arc! (finally)
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
