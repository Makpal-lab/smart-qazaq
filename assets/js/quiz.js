import { getLanguage } from "./i18n.js";

const bank = {
  kk: [
    { q:"«Қошқар мүйіз» оюы нені білдіреді?", a:["Өсімдік","Күш-қуат, молшылық","Теңіз"], correct:1 },
    { q:"Домбыра неше ішекті (дәстүрлі)?", a:["1","2","4"], correct:1 },
    { q:"Қазақтың дәстүрлі баспанасы:", a:["Сарай","Киіз үй","Көпқабатты үй"], correct:1 },
  ],
  ru: [
    { q:"Орнамент «Қошқар мүйіз» означает:", a:["Растение","Сила и изобилие","Море"], correct:1 },
    { q:"Сколько струн у домбры (традиционно)?", a:["1","2","4"], correct:1 },
    { q:"Традиционное жилище казахов:", a:["Дворец","Юрта","Многоэтажка"], correct:1 },
  ],
  en: [
    { q:"What does the 'Qoshqar muiz' ornament symbolize?", a:["Plant","Strength & abundance","Sea"], correct:1 },
    { q:"How many strings does a traditional dombra have?", a:["1","2","4"], correct:1 },
    { q:"Traditional Kazakh dwelling:", a:["Palace","Yurt","Apartment"], correct:1 },
  ]
};

function $(sel){ return document.querySelector(sel); }

export function mountQuiz(){
  const L = getLanguage();
  const questions = bank[L] || bank.kk;

  const box = $("#quiz");
  if(!box) return;

  box.innerHTML = "";
  questions.forEach((item, idx)=>{
    const wrap = document.createElement("div");
    wrap.className = "qRow";
    wrap.style.marginBottom = "14px";

    const h = document.createElement("h3");
    h.style.margin = "0 0 6px";
    h.textContent = `${idx+1}. ${item.q}`;
    wrap.appendChild(h);

    item.a.forEach((opt, oi)=>{
      const label = document.createElement("label");
      label.className = "opt";
      label.innerHTML = `
        <input type="radio" name="q${idx}" value="${oi}">
        <span>${opt}</span>
      `;
      wrap.appendChild(label);
    });

    box.appendChild(wrap);
  });

  $("#btnCheck")?.addEventListener("click", ()=>{
    let score = 0;
    questions.forEach((item, idx)=>{
      const chosen = document.querySelector(`input[name="q${idx}"]:checked`);
      if(chosen && Number(chosen.value) === item.correct) score++;
    });
    const total = questions.length;
    const res = $("#result");
    if(res){
      res.className = "result";
      res.textContent = `Ұпай: ${score} / ${total}`;
    }
  });
}
