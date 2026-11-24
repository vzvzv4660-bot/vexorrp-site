const products={
 money100:{name:"100 000 игровой валюты",price:"199 ₸"},
 money250:{name:"250 000 игровой валюты",price:"399 ₸"},
 money500:{name:"500 000 игровой валюты",price:"699 ₸"},
 money1500:{name:"1 500 000 игровой валюты",price:"1 499 ₸"},
 vip7:{name:"VIP на 7 дней",price:"499 ₸"},
 premium30:{name:"Premium на 30 дней",price:"1 299 ₸"},
 nickname:{name:"Смена никнейма",price:"299 ₸"},
 number:{name:"Эксклюзивный номер",price:"599 ₸ / ≈ 109 ₽"},
 donateruble:{name:"1 донатный рубль",price:"6 ₸ / 1 ₽"},
 militaryticket:{name:"Военный билет",price:"599 ₸ / ≈ 100 ₽"}
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
