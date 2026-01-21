// EmailJS қосу үшін: https://www.emailjs.com/ (тегін жоспар бар)
// 1) Email Services -> service_id
// 2) Email Templates -> template_id
// 3) Account -> Public Key

const EMAILJS_PUBLIC_KEY = "PASTE_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "PASTE_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "PASTE_TEMPLATE_ID";

function $(s){ return document.querySelector(s); }

export function mountContact(){
  const form = $("#appForm");
  if(!form) return;

  // EmailJS CDN арқылы қосылады (contact.html ішінде)
  emailjs.init(EMAILJS_PUBLIC_KEY);

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const btn = $("#btnSend");
    const status = $("#status");

    btn.disabled = true;
    btn.textContent = "Жіберілуде...";

    const data = {
      name: $("#name").value.trim(),
      email: $("#email").value.trim(),
      phone: $("#phone").value.trim(),
      message: $("#message").value.trim(),
    };

    try{
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
      status.textContent = "Өтініш сәтті жіберілді! Жауапты күтіңіз.";
      form.reset();
    }catch(err){
      console.error(err);
      status.textContent = "Қате шықты. Кейінірек қайталап көріңіз.";
    }finally{
      btn.disabled = false;
      btn.textContent = "Өтініш жіберу";
    }
  });
}
