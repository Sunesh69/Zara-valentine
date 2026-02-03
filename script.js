const noBtn=document.getElementById("noBtn");
const yesBtn=document.getElementById("yesBtn");
const popup=document.getElementById("popup");
const closeBtn=document.getElementById("closeBtn");
const box=document.querySelector('.popup-box');
const song=document.getElementById('loveSong');
const hearts=document.getElementById('hearts');
const roses=document.getElementById('roses');
const typedText=document.getElementById('typedText');

const message=`Zara,\n\nSome people slowly become important without making any noise.\n\nYou’re that person for me.\nWill you be my Valentine? 💖`;

function dodge(){
  const parent=document.querySelector('.buttons');
  noBtn.style.left=Math.random()*(parent.clientWidth-noBtn.offsetWidth)+'px';
  noBtn.style.top=Math.random()*(parent.clientHeight-noBtn.offsetHeight)+'px';
}
noBtn.addEventListener('mouseenter',dodge);
noBtn.addEventListener('touchstart',dodge,{passive:true});

function fadeInMusic(){
  song.volume=0;song.play().catch(()=>{});
  let v=0;const t=setInterval(()=>{if(v<0.8){v+=0.02;song.volume=v}else clearInterval(t)},200);
}

function typeText(){
  typedText.innerHTML='';let i=0;
  const t=setInterval(()=>{
    typedText.innerHTML+=message[i]==='\n'?'<br>':message[i];
    i++;if(i>=message.length) clearInterval(t);
  },45);
}

function spawn(el,emoji){
  const s=document.createElement('span');
  s.innerText=emoji;
  s.style.left=Math.random()*100+'vw';
  s.style.animationDuration=3+Math.random()*3+'s';
  el.appendChild(s);setTimeout(()=>s.remove(),6000);
}

const canvas=document.getElementById('confetti');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
addEventListener('resize',resize);resize();
let confetti=[];
function shootConfetti(){
  for(let i=0;i<120;i++){
    confetti.push({x:innerWidth/2,y:innerHeight/2,r:Math.random()*4+2,
      vx:(Math.random()-.5)*8,vy:(Math.random()-.8)*8,a:1});
  }
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p=>{
    ctx.globalAlpha=p.a;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
    p.x+=p.vx;p.y+=p.vy;p.vy+=0.05;p.a-=0.01;
  });
  confetti=confetti.filter(p=>p.a>0);
  requestAnimationFrame(draw);
}
draw();

yesBtn.addEventListener('click',()=>{
  popup.style.display='grid';
  box.classList.remove('animate');void box.offsetWidth;box.classList.add('animate');
  fadeInMusic();typeText();shootConfetti();
  setInterval(()=>spawn(hearts,'💖'),400);
  setInterval(()=>spawn(roses,'🌹'),700);
});

closeBtn.addEventListener('click',()=>{popup.style.display='none';song.pause()});
