const products = [
  {
    id: 1,
    name: "Iphone 16 Pro",
    price: 999,
  },
  {
    id: 2,
    name: "Ipad Air ",
    price: 599,
  },
  {
    id: 3,
    name: "Mackbook Air",
    price: 799,
  },
];

let total=0.0;
let cart = [];

const ProductList = document.getElementById("product-list");
let emptyCart = document.getElementById("empty-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const totalPrice = document.getElementById("total-price");
const checkOut = document.getElementById("checkout-btn");




function saveTasks() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function RenderTasks(){
  const alltasks = JSON.parse(localStorage.getItem('cart'));
  for(let i=0;i<alltasks.length;i++){
    addToCart(alltasks[i]);
  }
}
function addToCart(product){
  if(!emptyCart.classList.contains('hidden'))emptyCart.classList.add('hidden');
  if(cartTotal.classList.contains("hidden"))cartTotal.classList.remove("hidden");
  cart.push(product);
  saveTasks(); 
  const div = document.createElement('div');
  const newid = `remove-${Date.now()}`;
  div.innerHTML = `
  <span>${product.name}</span>
  <button class="remove-btn" id="${newid}">Remove</button>
  `;
  const removeBtn = div.querySelector(`#${newid}`);
  total+=product.price;
  totalPrice.innerText = `$${total.toFixed(2)}`;
  cartItems.appendChild(div);
  removeBtn.addEventListener("click", () => {
    cartItems.removeChild(div);
    total-=product.price;
    totalPrice.innerText = `$${total.toFixed(2)}`;

    const idx=cart.indexOf(product);
    if (idx !== -1) cart.splice(idx, 1);

    saveTasks();

    if(cart.length ===0){
      if (!cartTotal.classList.contains("hidden"))
        cartTotal.classList.add("hidden");

      while (cartItems.firstChild) cartItems.removeChild(cartItems.firstChild);

      cartItems.appendChild(emptyCart);
      if (emptyCart.classList.contains("hidden"))
        emptyCart.classList.remove("hidden");

    }
  });
}

  products.forEach(function(product){
    const div=document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id = "${product.id}">Add to cart</button>
    `;
    ProductList.appendChild(div);
  })

  ProductList.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      let idx= parseInt(event.target.getAttribute('data-id'));
      const Need = products.find(p => p.id === idx);
      addToCart(Need);
    }
  });

  RenderTasks();

  checkOut.addEventListener('click' , ()=>{
    cart = [];
    saveTasks();
    alert("Thanku for shopping your total is:" + total);
    total = 0.0;
    if (!cartTotal.classList.contains("hidden"))cartTotal.classList.add("hidden");
      
    while (cartItems.firstChild) cartItems.removeChild(cartItems.firstChild);
    cartItems.appendChild(emptyCart);
    if (emptyCart.classList.contains("hidden"))
      emptyCart.classList.remove("hidden");
  })

