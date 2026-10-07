const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let cart=JSON.parse(localStorage.getItem("creepCart")||"[]");

function money(n){return "$"+n.toLocaleString("es-AR")}
function save(){localStorage.setItem("creepCart",JSON.stringify(cart));renderCart()}
function renderCart(){
  $("#cartCount").textContent=cart.reduce((a,i)=>a+i.qty,0);
  const box=$("#cartItems");
  if(!cart.length){box.innerHTML='<p class="empty">El carrito está vacío.</p>';$("#subtotal").textContent="$0";return}
  box.innerHTML=cart.map((i,n)=>`<div class="cart-item"><div class="cart-thumb"></div><div class="cart-item-info"><b>${i.name}</b><small>${money(i.price)} × ${i.qty}</small><button class="remove" data-remove="${n}">Quitar</button></div><strong>${money(i.price*i.qty)}</strong></div>`).join("");
  $("#subtotal").textContent=money(cart.reduce((a,i)=>a+i.price*i.qty,0));
  $$("[data-remove]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.remove,1);save()});
}
$$(".add").forEach(btn=>btn.onclick=()=>{
  const p=btn.closest(".product"), item={name:p.dataset.name,price:+p.dataset.price,qty:1};
  const old=cart.find(x=>x.name===item.name); old?old.qty++:cart.push(item); save();
  $("#cart").classList.add("open");$("#overlay").classList.add("show");
});
$("#cartBtn").onclick=()=>{$("#cart").classList.add("open");$("#overlay").classList.add("show")};
function closeCart(){$("#cart").classList.remove("open");$("#overlay").classList.remove("show")}
$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.toggle("open");$("#searchInput").focus()};
$$(".filter").forEach(b=>b.onclick=()=>{
  $$(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");
  const f=b.dataset.filter;
  $$(".product").forEach(p=>p.classList.toggle("hidden",f!=="all"&&p.dataset.category!==f));
});
$("#searchInput").oninput=e=>{
  const q=e.target.value.toLowerCase();
  $$(".product").forEach(p=>p.classList.toggle("hidden",!p.dataset.name.toLowerCase().includes(q)));
};
$("#newsletter").onsubmit=e=>{e.preventDefault();alert("¡Listo! Te suscribiste a CREEP.");e.target.reset()};
$("#checkout").onclick=()=>alert("Este botón es una demo. Para vender de verdad hay que conectar un medio de pago y un sistema de pedidos.");
renderCart();
