window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c = document.getElementById( 'c' ),
    ctx = c.getContext( '2d' ),
    tick = 0,
    cw, ch;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  ctx.save();
  ctx.beginPath();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 1; i < sides; i++) {
    ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }
  ctx.closePath();
  ctx.restore();
}

function resize() {
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
}

function loop() {
  requestAnimFrame( loop );
  tick++;
  ctx.clearRect( 0, 0, cw, ch );
  ctx.globalCompositeOperation = 'source-over';

  polygon( ctx, cw / 2, ch / 2, 100 + Math.cos(tick/30) * 15, 3, (tick / 15) - Math.PI );
  ctx.fillStyle = 'hsla(327, 56%, 43%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 75 + Math.cos(tick/30) * 15, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(160, 56%, 44%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 60 + Math.cos(tick/30) * 10, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(0, 56%, 42%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  polygon( ctx, cw / 2, ch / 2, 75 + Math.cos(tick/30) * 15, 3, (-tick / 50) - Math.PI );
  ctx.fillStyle = 'hsla(160, 56%, 44%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  polygon( ctx, cw / 2, ch / 2, 75 + Math.cos(tick/30) * 15, 3, (-tick / 50));
  ctx.fillStyle = 'hsla(160, 56%, 44%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 25 + Math.cos(tick/30) * 10, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(160, 56%, 44%, 1)';
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(cw / 2, ch / 2, 15 + Math.cos(tick/30) * 50, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(160, 56%, 44%, 1)';
  ctx.fill();
}

window.addEventListener( 'resize', resize);

setTimeout( function(){
  resize();
  loop();
}, 50 );
