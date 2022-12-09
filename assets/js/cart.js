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

    //method to call all the elements in the local storage
    static getLocalCartItems(){
        let cartMap = new Map()
        const cart= localStorage.getItem(LocalCart.key)
        if(cart === null || cart.length === 0){
            return cartMap
        }
        return new Map(Object.entries(JSON.parse(cart)))
    }

    //method that adds to the local storage
    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems(id, item)
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        }
        else {
            cart.set(id, item)
        }
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }

    //method that deletes objects (items) from the cart 
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

//identify add to cart btns
const orderNowBtns = document.querySelectorAll('.food-menu-btn')
orderNowBtns.forEach( (btn) =>{
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


//toggle cart menu
cartBtn.addEventListener('click',()=> {
    // if(wholeCartWindow.classList.contains('hide'))
    // wholeCartWindow.classList.remove('hide')
    wholeCartWindow.classList.toggle('hide')
})

// cartBtn.addEventListener('click',()=> {
//     wholeCartWindow.classList.add('hide')
// })

//back to menu
// const back=document.querySelector('.back-to-menu')
// back.addEventListener('click',()=>{
//     localStorage.clear()
// })


const checkout = document.querySelector('.checkout')

checkout.addEventListener('click',()=>{
    alert("thank you for your purshace")
    localStorage.clear()
})

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




// document.addEventListener('DOMContentLoaded', ()=>{updateCartUI})


// const all=document.querySelector('.all')
// const salades=document.querySelector('.salades')
// const noodles=document.querySelector('.noodles')
// const plates=document.querySelector('.plates')
// const maki=document.querySelector('.maki')
// const allbtn=document.getElementById('all')
// const saladebtn=document.getElementById('salades')
// const noodlebtn=document.getElementById('noodles')
// const platebtn=document.getElementById('plates')
// const makibtn=document.getElementById('maki')


// allbtn.addEventListener('click',function(){
//     salades.style.display= 'flex'
//     noodles.style.display= 'flex'
//     plates.style.display= 'flex'
//     maki.style.display= 'flex'
//     console.log('ALL')
// })
// saladebtn.addEventListener('click',function(){
//     salades.style.display= 'flex'
//     noodles.style.display= 'none'
//     plates.style.display= 'none'
//     maki.style.display= 'none'
//     console.log('SALADES')
// })
// noodlebtn.addEventListener('click',function(){
//     salades.style.display= 'none'
//     noodles.style.display= 'flex'
//     plates.style.display= 'none'
//     maki.style.display= 'none'
//     console.log('NOONDLEs')
// })
// platebtn.addEventListener('click',function(){
//     salades.style.display= 'none'
//     noodles.style.display= 'none'
//     plates.style.display= 'flex'
//     maki.style.display= 'none'
//     console.log('PLATES')
// })
// makibtn.addEventListener('click',function(){
//     salades.style.display= 'none'
//     noodles.style.display= 'none'
//     plates.style.display= 'none'
//     maki.style.display= 'flex'
//     console.log('MAKI')
// })

