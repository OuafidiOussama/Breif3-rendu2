class CartItem{
    constructor(name, img, price){
        this.name = name
        this.img = img
        this.price = price
        this.quantity = 1
    }
}

class LocalCart{
    static key  = 'cartItems'

    static getLocalCartItems(){
        let cartMap = new Map()
        const cart= localStorage.getItem(LocalCart.key)
        if(cart === null || cart.length === 0){
            return cartMap
        }
        return new Map(Object.entries(JSON.parse(cart)))
    }
    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems(id, item)
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        }
        else cart.set(id, item)
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }
    static removeItemFromCart(id){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            if(mapItem.quantity > 1){
                mapItem.quantity -= 1
                cart.set(id, mapItem)
            }
            else {
                cart.delete(id)
            }
        }
        if(cart.length === 0){
            localStorage.clear()
        }
        else {

            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
            updateCartUI()
        }
         
    }
}



const cartBtn = document.querySelector('#cart')
const wholeCartWindow = document.querySelector('.whole-cart-window')
const addToCartBtns = document.querySelectorAll('.food-menu-btn')
addToCartBtns.forEach( (btn) =>{
    btn.addEventListener('click', addItemFunction)
})

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.getAttribute("data-id")
    const img = e.target.previousElementSibling.previousElementSibling.src
    const name = e.target.parentElement.nextElementSibling.children[0].textContent
    let price = e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.children[1].textContent
    price = price.replace("$", "")
    const item = new CartItem(name, img, price)
    LocalCart.addItemToLocalCart(id, item)
} 

cartBtn.addEventListener('click',()=> {
    // if(wholeCartWindow.classList.contains('hide'))
    // wholeCartWindow.classList.remove('hide')
    wholeCartWindow.classList.toggle('hide')
})

// cartBtn.addEventListener('click',()=> {
//     wholeCartWindow.classList.add('hide')
// })


function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML = ''
    const items = LocalCart.getLocalCartItems('cartItems')
    if(items === null){ 
        return 
    }
    let count = 0
    let total = 0
    for(const[key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count +=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML = `
            <img src="${value.img}">
            <div class="detail">
            <h3>${value.name}</h3>
                <span class="quantity">Quantity: ${value.quantity}</span>
                <span class="price">Price: $${value.price*value.quantity}</span>
            </div>
            <button class ="close">x</button>
        `
        cartItem.lastElementChild.addEventListener('click', ()=>{
            LocalCart.removeItemFromCart(key)
            
        })
        cartWrapper.append(cartItem)
    }
    if(count > 0){
        const totax = document.querySelector('.total')
        totax.innerHTML=`Total : $${total}`
    }
    

}
document.addEventListener('DOMContentLoaded', ()=>{updateCartUI})
