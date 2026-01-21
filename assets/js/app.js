import { initI18n, setLanguage, getLanguage, applyTranslations } from "./i18n.js";

function setActiveMenu(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    a.classList.toggle("active", href.endsWith(path));
  });
}

function bindLanguageButtons(){
  const current = getLanguage();
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === current);
    btn.addEventListener("click", async ()=>{
      await setLanguage(btn.dataset.lang);
      document.querySelectorAll("[data-lang]").forEach(b=>{
        b.classList.toggle("active", b.dataset.lang === getLanguage());
      });
    });
  });
}

(async function boot(){
  setActiveMenu();
  await initI18n();
  bindLanguageButtons();
  applyTranslations();
})();
