const LANG_KEY = "sq_lang";
let dict = {};
let lang = localStorage.getItem(LANG_KEY) || "kk";

export function getLanguage(){ return lang; }

async function loadJson(l){
  const res = await fetch(`assets/i18n/${l}.json`);
  if(!res.ok) throw new Error("Translation load failed");
  return await res.json();
}

export async function initI18n(){
  dict = await loadJson(lang);
}

export function applyTranslations(){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    const val = dict[key];
    if(typeof val === "string") el.textContent = val;
  });

  // placeholder-лер
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    const val = dict[key];
    if(typeof val === "string") el.setAttribute("placeholder", val);
  });
}

export async function setLanguage(newLang){
  lang = newLang;
  localStorage.setItem(LANG_KEY, lang);
  dict = await loadJson(lang);
  applyTranslations();
}
