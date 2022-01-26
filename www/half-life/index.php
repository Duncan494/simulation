<!DOCTYPE html>
<html>
<head>
  <title>Prof G Rad Sim</title>
</head>
<body>
  Half Life : <span id="hl">2</span>
  <input id="halfLifeSlider" type="range" min="1" max="100" value="2">
  Particles : <span id="p">150</span>
  <input id="particlesSlider" type="range" min="50" max="400" value="150"> 
  <button onclick="start()"> Start </button>
  <br>
  <canvas id="myCanvas" width="500" height="400" style="border:1px solid #000000;"></canvas>

<script>
var hlslider = document.getElementById("halfLifeSlider");
var pslider = document.getElementById("particlesSlider");
var hl = document.getElementById("hl");
var p = document.getElementById("p");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x = 0;
var y= 0;
var started = false;
var particles =[];
var halflife = 2;
var pstart = 250;
var pamt = pstart;
var expo = 0;
var startTime = 0;
var prev =0 

function drawCircle(x,y,canvas) {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.stroke(); 
    ctx.fill()
    
}



function drawParictles(particles) {
    for(i in particles){
        drawCircle(particles[i][0],particles[i][1],c)
    }
}
function start() {
  particles = []
  for (let i = 0; i < pstart; i++) {
    const particle=[Math.floor(Math.random() * 500),Math.floor(Math.random() * 400)];
    particles.push(particle);
  } 
  startTime = Date.now();
  animate();
}

function animate(timestamp) {
  if (timestamp-prev>100){
  ctx.clearRect(0, 0, c.width, c.height);
  timeSpent = Date.now() - startTime;
  expo = timeSpent/(halflife*1000);
  pamt = pstart * (Math.pow(0.5, expo));
  pamt = particles.length - pamt; 
  for(let i = 0; i < pamt; i++){
    particles.pop()
  }
  prev = timestamp;
  drawParictles(particles);
 }
  if (particles.length != 0){
    requestAnimationFrame(animate);
  }
}

hlslider.oninput = function() {
  halflife = this.value;
  hl.innerHTML = halflife;
}

pslider.oninput = function() {
  pstart = this.value;
  p.innerHTML = pstart;
}


</script>

</html> 
