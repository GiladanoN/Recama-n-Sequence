
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
            return sParameterName[1];
    }
    return undefined;
}


let looping = true;
function addLoopButton(posx, posy) {
  return createButton('Loop / NoLoop', looping)
    .position(posx, posy)
    .mousePressed(e => {
      if (looping) {  noLoop();  console.log("paused");     }
      else         {  loop();    console.log("continued");  }
      looping = !looping;
    });
}

// 4testing
let Floater = function(w,h) {
  this.x = random(w);
  this.y = random(h);
  this.w = w; this.h = h;

  this.show = function() {
    rect(this.x,this.y,20,20);
  }
  this.update = function () {
    this.x++; this.y++;
    if (this.x > this.w+10) this.x=-10;
    if (this.y > this.h+10) this.y=-10;
  }
  this.do = function() {
    this.show(); this.update();
  }
}
