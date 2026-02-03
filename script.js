const timerEl=document.getElementById("timer");
const lineEl=document.getElementById("line");
const question=document.getElementById("question");
const title=document.getElementById("title");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const popup=document.getElementById("popup");
const song=document.getElementById("song");
const typedText=document.getElementById("typedText");
const finalLine=document.getElementById("finalLine");
const hearts=document.querySelector(".hearts");

const compliments=[
  "Because you have the prettiest smile 💖",
  "Because talking to you feels like home 🏡",
  "Because you make ordinary moments special ✨",
  "Because your laugh is my favorite sound 🎶",
  "Because you light up my day effortlessly ☀️",
  "Because you are kind, beautiful, and real 💕",
  "Because life feels better with you around 🌸",
  "Because you’re my favorite notification 📱",
  "Because you make my heart calm and crazy 💓",
  "Because I want you — today and always ❤️"
];

// autoplay music
function startMusic(){
  song.volume=0;
  song.play().catch(()=>{});
  let v=0;
  const f=setInterval(()=>{
    v+=0.02;
    song.volume=v;
    if(v>=0.6) clearInterval(f);
  },200);
}
window.addEventListener("load",startMusic);
window.addEventListener("click",startMusic,{once:true});

let time=10,index=0;
const countdown=setInterval(()=>{
  time--;
  timerEl.textContent=time;
  index++;
  if(index<compliments.length){
    lineEl.textContent=compliments[index];
  }
  if(time<=0||index===compliments.length-1){
    clearInterval(countdown);
    document.querySelector(".countdown").classList.add("hidden");
    title.textContent="One last question… 💘";
    question.classList.remove("hidden");
    moveNo();
  }
},1000);

function moveNo(){
  const yes=yesBtn.getBoundingClientRect();
  let x,y,safe=false;
  while(!safe){
    x=Math.random()*(innerWidth-noBtn.offsetWidth-40)+20;
    y=Math.random()*(innerHeight-noBtn.offsetHeight-40)+20;
    safe=(
      x+noBtn.offsetWidth<yes.left-40||
      x>yes.right+40||
      y+noBtn.offsetHeight<yes.top-40||
      y>yes.bottom+40
    );
  }
  noBtn.style.left=x+"px";
  noBtn.style.top=y+"px";
}
noBtn.onclick=moveNo;
noBtn.onmouseenter=moveNo;

yesBtn.onclick=()=>{
  popup.style.display="grid";
  typeText();
};

function typeText(){
  const msg=`Zara,
you just turned this moment into a memory I’ll cherish forever.
Thank you for choosing me ❤️`;
  typedText.textContent="";
  let i=0;
  const t=setInterval(()=>{
    typedText.textContent+=msg[i++];
    if(i>=msg.length)clearInterval(t);
  },70); // slower typing
}

// more hearts after YES
setInterval(()=>{
  const s=document.createElement("span");
  s.textContent=["💗","💖","💕","💘"][Math.floor(Math.random()*4)];
  s.style.left=Math.random()*100+"%";
  s.style.fontSize=(Math.random()*14+14)+"px";
  hearts.appendChild(s);
  setTimeout(()=>s.remove(),4000);
},350);
