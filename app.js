const $ = (s) => document.querySelector(s);
const toast = $("#toast");
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
const loginForm = $("#loginForm");
const loginTab = $("#loginTab");
const registerTab = $("#registerTab");
const confirmPasswordLabel = $("#confirmPasswordLabel");
const accountSubmit = $("#accountSubmit");
const modalDescription = $("#modalDescription");
const modalNote = $("#modalNote");
let accountMode = "login";
function setAccountMode(mode){
  accountMode = mode;
  const registering = mode === "register";
  loginTab.classList.toggle("active", !registering);
  registerTab.classList.toggle("active", registering);
  loginTab.setAttribute("aria-selected", String(!registering));
  registerTab.setAttribute("aria-selected", String(registering));
  confirmPasswordLabel.hidden = !registering;
  confirmPasswordLabel.querySelector("input").required = registering;
  loginForm.elements.password.autocomplete = registering ? "new-password" : "current-password";
  $("#modalTitle").textContent = registering ? "СОЗДАНИЕ АККАУНТА" : "ЛИЧНЫЙ КАБИНЕТ";
  modalDescription.textContent = registering ? "Создай аккаунт VEXOR RP, чтобы присоединиться к игровому миру." : "Войди, чтобы управлять своим игровым профилем.";
  accountSubmit.textContent = registering ? "Зарегистрироваться ↗" : "Войти в аккаунт ↗";
  modalNote.textContent = "Демо-интерфейс. Для настоящей авторизации и регистрации требуется серверная часть проекта.";
}
loginTab.addEventListener("click",()=>setAccountMode("login"));
registerTab.addEventListener("click",()=>setAccountMode("register"));
loginForm.addEventListener("submit",e=>{
  e.preventDefault();
  const password = loginForm.elements.password.value;
  if(accountMode === "register" && password !== loginForm.elements.confirmPassword.value){
    notify("Пароли не совпадают. Проверь повтор пароля.");
    return;
  }
  notify(accountMode === "register" ? "Форма регистрации готова. Подключите сервер для создания аккаунта." : "Демо-режим: подключите API авторизации, чтобы войти.");
});
document.querySelectorAll(".store-category").forEach(button=>button.addEventListener("click",()=>{
  const filter=button.dataset.storeFilter;
  document.querySelectorAll(".store-category").forEach(item=>item.classList.toggle("is-active",item===button));
  document.querySelectorAll(".store-product").forEach(card=>{card.hidden=filter!=="all"&&card.dataset.storeType!==filter;});
}));
document.querySelectorAll(".store-buy").forEach(button=>button.addEventListener("click",()=>{
  notify("«"+button.dataset.item+"»: демонстрационный товар. Оплата и выдача будут подключены после запуска сервера.");
}));

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section=>observer.observe(section));
