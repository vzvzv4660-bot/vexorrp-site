(() => {
  const products = {
    "money-100": {name:"100 000 игровой валюты", price:"199 ₸"},
    "money-250": {name:"250 000 игровой валюты", price:"399 ₸"},
    "money-500": {name:"500 000 игровой валюты", price:"699 ₸"},
    "money-1500": {name:"1 500 000 игровой валюты", price:"1 499 ₸"},
    "vip-7": {name:"VIP на 7 дней", price:"499 ₸"},
    "premium-30": {name:"Premium на 30 дней", price:"1 299 ₸"},
    "nickname": {name:"Смена никнейма", price:"299 ₸"},
    "number": {name:"Эксклюзивный номер", price:"599 ₸"}
  };
  const params = new URLSearchParams(location.search);
  const product = products[params.get("product")];
  const config = window.VEXOR_PAYMENT_CONFIG || {};
  const nameEl = document.getElementById("productName");
  const priceEl = document.getElementById("productPrice");
  const nickEl = document.getElementById("gameNick");
  const cardEl = document.getElementById("cardNumber");
  const holderEl = document.getElementById("cardHolder");
  const copyBtn = document.getElementById("copyCard");
  const tgLink = document.getElementById("telegramLink");
  const toast = document.getElementById("storeToast");

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3000);
  }
  if (!product) {
    nameEl.textContent = "Товар не найден";
    priceEl.textContent = "—";
    tgLink.setAttribute("aria-disabled","true");
    tgLink.addEventListener("click", e => { e.preventDefault(); notify("Вернись в магазин и выбери товар."); });
    return;
  }
  nameEl.textContent = product.name;
  priceEl.textContent = product.price;
  const digits = String(config.cardNumber || "").replace(/\s+/g,"");
  const configured = /^\d{16,19}$/.test(digits);
  cardEl.textContent = configured ? String(config.cardNumber).replace(/(.{4})/g,"$1 ").trim() : "Номер карты не настроен";
  holderEl.textContent = config.cardHolder || "VEXOR RP";

  copyBtn.addEventListener("click", async () => {
    if (!configured) { notify("Сначала укажи номер карты в payment-config.js."); return; }
    try { await navigator.clipboard.writeText(digits); notify("Номер карты скопирован."); }
    catch { notify("Не удалось скопировать. Выдели номер карты вручную."); }
  });

  function updateTelegramLink() {
    const nick = nickEl.value.trim();
    const text = [
      "Здравствуйте! Хочу подтвердить покупку VEXOR RP.",
      "",
      "Товар: " + product.name,
      "Сумма: " + product.price,
      "Игровой ник: " + (nick || "не указан"),
      "",
      "Прикрепляю подтверждение перевода Kaspi."
    ].join("\n");
    tgLink.href = "https://t.me/" + (config.telegramUsername || "xEgorkaaSV") + "?text=" + encodeURIComponent(text);
  }
  nickEl.addEventListener("input", updateTelegramLink);
  updateTelegramLink();
  tgLink.addEventListener("click", event => {
    if (!nickEl.value.trim()) {
      event.preventDefault();
      nickEl.focus();
      notify("Сначала укажи игровой ник.");
    }
  });
})();
