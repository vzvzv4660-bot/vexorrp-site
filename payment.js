const products={
 cash1:{name:"1 млн игровой валюты",price:"500 ₸ / 90 ₽"},
 cash2:{name:"5 млн игровой валюты",price:"2 300 ₸ / 410 ₽"},
 cash3:{name:"10 млн игровой валюты",price:"4 300 ₸ / 770 ₽"},
 cash4:{name:"25 млн игровой валюты",price:"10 000 ₸ / 1 790 ₽"},
 cash5:{name:"50 млн игровой валюты",price:"18 500 ₸ / 3 310 ₽"},
 cash6:{name:"100 млн игровой валюты",price:"35 000 ₸ / 6 255 ₽"},
 cash7:{name:"250 млн игровой валюты",price:"82 000 ₸ / 14 650 ₽"},
 cash8:{name:"500 млн игровой валюты",price:"155 000 ₸ / 27 700 ₽"},
 donate9:{name:"100 донат-рублей",price:"600 ₸ / 100 ₽"},
 donate10:{name:"250 донат-рублей",price:"1 500 ₸ / 250 ₽"},
 donate11:{name:"500 донат-рублей",price:"3 000 ₸ / 500 ₽"},
 donate12:{name:"1 000 донат-рублей",price:"6 000 ₸ / 1 000 ₽"},
 donate13:{name:"2 500 донат-рублей",price:"15 000 ₸ / 2 500 ₽"},
 donate14:{name:"5 000 донат-рублей",price:"30 000 ₸ / 5 000 ₽"},
 donate15:{name:"10 000 донат-рублей",price:"60 000 ₸ / 10 000 ₽"},
 vip16:{name:"VIP Silver — 30 дней",price:"3 900 ₸ / 700 ₽"},
 vip17:{name:"VIP Gold — 30 дней",price:"7 500 ₸ / 1 340 ₽"},
 vip18:{name:"VIP Platinum — 30 дней",price:"14 500 ₸ / 2 600 ₽"},
 service19:{name:"Смена никнейма",price:"280 ₸ / 50 ₽"},
 service20:{name:"Все лицензии",price:"560 ₸ / 100 ₽"},
 service21:{name:"Военный билет",price:"780 ₸ / 140 ₽"},
 service22:{name:"Снятие предупреждения",price:"670 ₸ / 120 ₽"},
 starter23:{name:"Набор «Новичок»",price:"1 120 ₸ / 200 ₽"},
 starter24:{name:"Набор «Местный»",price:"1 680 ₸ / 300 ₽"},
 starter25:{name:"Набор «Резидент»",price:"2 800 ₸ / 500 ₽"},
 season26:{name:"Сезонный пропуск",price:"2 800 ₸ / 500 ₽"},
 season27:{name:"Пакет дополнительных бонусов",price:"560 ₸ / 100 ₽"},
 season28:{name:"Набор для новичка",price:"840 ₸ / 150 ₽"}
};

const params=new URLSearchParams(location.search);
const product=products[params.get("product")];
const nameEl=document.getElementById("productName");
const priceEl=document.getElementById("productPrice");
const button=document.getElementById("sendOrder");
if(product){nameEl.textContent=product.name;priceEl.textContent=product.price;}
else{ nameEl.textContent="Товар не найден"; priceEl.textContent=""; button.disabled=true; }
button.addEventListener("click",()=>{
 const nick=document.getElementById("playerNick").value.trim();
 if(!product)return;
 if(!nick){document.getElementById("paymentStatus").textContent="Сначала укажи игровой никнейм.";document.getElementById("playerNick").focus();return;}
 const message=`Здравствуйте! Хочу оформить заказ VEXOR RP.\nТовар: ${product.name}\nСумма: ${product.price}\nИгровой никнейм: ${nick}\nПожалуйста, подтвердите заказ и сообщите дальнейшие шаги.`;
 location.href="https://t.me/xEgorkaaSV?text="+encodeURIComponent(message);
});
