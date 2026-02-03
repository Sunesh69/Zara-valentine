// ===== CUSTOM NAME HERE =====
const proposerName = "Sandeep"; // change this 👈

// ============================
const complimentEl=document.getElementById("compliment");
const question=document.getElementById("question");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const popup=document.getElementById("popup");
const typedText=document.getElementById("typedText");
const song=document.getElementById("song");
const hearts=document.querySelector(".hearts");
const spotlight=document.getElementById("spotlight");
document.getElementById("fromName").textContent = proposerName;

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

let index=0;
function showNext(){
  if(index<compliments.length){
    complimentEl.textContent=compliments[index];
    complimentEl.style.animation="none";
    complimentEl.offsetHeight;
    complimentEl.style.animation="fadeText 1s";
    index++;
    setTimeout(showNext,4000); // 10 sec each
  }else{
    setTimeout(()=>{ // 2 sec pause
      spotlight.classList.remove("hidden");
      question.classList.remove("hidden");
      moveNo();
    },2000);
  }
}
setTimeout(showNext,4000);

// NO button move
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
— ${proposerName}`;
  typedText.textContent="";
  let i=0;
  const t=setInterval(()=>{
    typedText.textContent+=msg[i++];
    if(i>=msg.length)clearInterval(t);
  },70);
}

// floating hearts
setInterval(()=>{
  const s=document.createElement("span");
  s.textContent=["💗","💖","💕","💘"][Math.floor(Math.random()*4)];
  s.style.left=Math.random()*100+"%";
  s.style.fontSize=(Math.random()*14+14)+"px";
  hearts.appendChild(s);
  setTimeout(()=>s.remove(),6000);
},500);
