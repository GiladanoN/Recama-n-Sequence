
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
// let c, n;
let r;
let index, step;
let sect = 0;
let eps;

function setup()
{
  scl = 20;
  h = scl*20;
  w = 1000;

  createCanvas(w+1,h+1);
  bg = initBackground();
  eps = PI/4096;

  // numbers[0] = 0;
  // c = 0; k = 1;
  r = Recaman(500);
  index = 1;
  step = PI/32; // step = PI/128;
  sect = 0;

  // frameRate(1.5);
  frameRate(5);
  // frameRate(10);
  // frameRate(15);

  // colorMode(HSB, 255, 100, 100, 10);
  // C = new constants();
  // t = new tile(30);

  addLoopButton(20, height+20);
  saneFloater = new Floater(w+1,h+1);

}

function initBackground() {
  push();
  bg = createGraphics(w+1,h+1)
  bg.scale(0.5).background(0);
  bg.stroke(255).line(0,h/2, w,h/2);
  bg.stroke(255,255,255,200);
  let y = h/2 - scl/4;
  for (let x=0; x<=w; x+=scl) {
    bg.strokeWeight(!(x/scl%5) ? 4 : 1);
    bg.line(x,y, x,y+scl/2);
  }
  pop();
  return bg;
}

function draw()
{
  image(bg,0,0);  // background / numberline
  let u = true;   // if set only globaly, the animation
                  // 'flips' on even length'd arrays

  if (index >= r.length) {
    console.log('Done!');
    noLoop(); return;
  }

  // for (let i=1; i<index; i++) {
  //   u = !(i%2);
  //   sect = index - i;
  //   connectNumbers(r[i-1],r[i], sect, u);
  // }
  index += step;

  sect %= 1;
  // connectNumbers(47,42, sect, true);  // under, RTL
  // connectNumbers(46,43, sect, false); // over,  RTL
  // connectNumbers(42,47, sect, true);  // under, LTR
  // connectNumbers(43,46, sect, false); // over,  LTR

  sect+=0.1;

  saneFloater.do();
}

function connectNumbers(cur, next, sect, under) {
  push();
    noFill();
    ellipseMode(CORNER);
    stroke(255);
    translate(0, h/2-scl/2);  // mid screen/line

    let backwd = (next < cur);
    if (backwd)
      [next,cur] = [cur,next]   // swap input's order

    let d = next - cur;     // delta to deratmin arc's 'size'
    let s = scl * d;        // respective w/h values for arc(...)
    let x = cur * scl;      // x offset, assumes fixed layout.
    let y = -scl*(d-1)/2;   // y offset - how many 'half-steps' to fix
                            //    upwards, as arc is drawn from CORNER

    // limitting section to bounds (arcs may not cross the numberline!)
    // using epsillon≈0 due to equal-angle inputs breaking arc(~)
    sect = (sect<=0) ? eps : ((sect>1) ? 1 : sect);

    if (!backwd)         // invert drawing direction.
      sect = 1 - sect;   // sect: RTL, 1-sect: LTR    (0~1 vs 1~0)

    // begin/end angles explained: (under-or-over the numberline)
/** ┌─────────┬──────┬──────────────┬────────────────┬──────┬───────────────┐
  * │ Ovr/Und │ Dirc │  Range(b,e)  │    Formula     │ Sect │ EXAMPLE Param │
  * ├─────────┼──────┼──────────────┼────────────────┼──────┼───────────────┤
  * │ over ^  │ L>>R │ -[PI™ ,0~PI] │ [-PI,-PI*sect] │ 1~>0 │ f:(1,6,s,Fls) │
  * │ over ^  │ R<<L │ -[0~PI,  0™] │ [-PI*sect  ,0] │ 0~>1 │ f:(7,2,s,Tru) │
  * │ under _ │ L>>R │ +[PI~0, PI™] │ [+PI,+PI*sect] │ 1~>0 │ f:(3,8,s,Fls) │
  * │ under _ │ R<<L │ +[0™  ,0~PI] │ [0,  +PI*sect] │ 0~>1 │ f:(9,4,s,Tru) │
  * └─────────┴──────┴──────────────┴────────────────┴──────┴───────────────┘
  * */
    let [b,e] = [-PI,-PI*sect];  // fixed beginAng
    if (backwd)
      [b,e] = [-PI*sect,0];      // fixed endAng

    if (under)
      [b,e] = [-e,-b];     // reverse & negate if under the numberline

    arc(x,y, s,s, b, e);   // now DRAW my arc! (finally)
    console.log('b='+b, 'e='+e, 'sc='+sect);
    // console.log(x,y, s,s, b, e);
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
