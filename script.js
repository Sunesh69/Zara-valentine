const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.querySelector(".popup");
const closeBtn = document.getElementById("closeBtn");
const song = document.getElementById("loveSong");
const typedText = document.getElementById("typedText");
const tease = document.getElementById("tease");
const barFill = document.getElementById("barFill");
const scoreEl = document.getElementById("score");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let escapes = 0;
let timerStarted = false;
let autoYesArmed = false;

const message = `Zara,\n\nSome people slowly become important without making any noise.\n\nYou’re that person for me.\nWill you be my Valentine? 💖`;

function resize(){ canvas.width=innerWidth; canvas.height=innerHeight }
addEventListener('resize', resize); resize();

let confetti=[];
function shootConfetti(n=120){
  for(let i=0;i<n;i++){
    confetti.push({
      x:innerWidth/2, y:innerHeight/2,
      r:Math.random()*4+2,
      vx:(Math.random()-.5)*8,
      vy:(Math.random()-.8)*8,
      a:1
    });
  }
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p=>{
    ctx.globalAlpha=p.a;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='#fff'; ctx.fill();
    p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; p.a-=0.01;
  });
  confetti=confetti.filter(p=>p.a>0);
  requestAnimationFrame(draw);
}
draw();

function randomPos(){
  const pad = 20;
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - pad*2) + pad;
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - pad*2) + pad;
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

function startTimer(){
  if(timerStarted) return;
  timerStarted = true;
  let t = 0;
  const iv = setInterval(()=>{
    t += 10;
    barFill.style.width = Math.min(t,100) + "%";
    if(t >= 100){
      yesBtn.classList.add("glow");
      tease.innerText = "Okay… destiny says YES 💕";
      shootConfetti(80);
      autoYesArmed = true;
      clearInterval(iv);
      setTimeout(()=> yesBtn.click(), 1500);
    }
  }, 1000);
}

function dodge(){
  startTimer();
  escapes++; scoreEl.textContent = escapes;
  randomPos();
  if(escapes===3) tease.innerText="Nope 😜 still no chance";
  if(escapes===6) tease.innerText="Persistent, huh? 😌";
  if(escapes===9) tease.innerText="Alright… almost there 💖";
}

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", dodge, {passive:true});

function fadeInMusic(){
  song.volume=0; song.play().catch(()=>{});
  let v=0; const t=setInterval(()=>{ if(v<0.8){v+=0.02; song.volume=v}else clearInterval(t)},200);
}

function typeText(){
  typedText.innerHTML=""; let i=0;
  const t=setInterval(()=>{
    typedText.innerHTML += message[i]==="\n" ? "<br>" : message[i];
    i++; if(i>=message.length) clearInterval(t);
  },45);
}

yesBtn.addEventListener("click",()=>{
  popup.style.display="grid";
  fadeInMusic(); typeText(); shootConfetti(160);
});

closeBtn.addEventListener("click",()=>{ popup.style.display="none"; song.pause(); });
