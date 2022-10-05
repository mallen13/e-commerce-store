//helper to find index of item in cart
export const findInCart = (cart,product) => {
    for (let i = 0; i < cart.items.length; i++) { 
      if (cart.items[i].title === product.title) {
        return i;
      }
    }
    return null;
  }

//deep clone helper
export const deepClone = object => JSON.parse(JSON.stringify(object));

//add to cart helper
export const addToCart = (cart,product,index) => {
 //increment quantity if exists
 if (index !== null) { 
   cart.items[index].quantity++;
   cart.numItems++;
   cart.items[index].total += product.price;
   cart.subtotal += product.price;
 } else {
   //if doesn't exist, add to cart
   cart.items.push({
     title: product.title, 
     image: product.image,
     quantity: 1, 
     price: product.price,
     total: product.price
  });
   cart.subtotal += product.price;
   cart.numItems++;
 }
 return cart;
}

//subtact from cart helper
export const subtractFromCart = (cart,product,index) => {
 //subtract from quantity,numItems,item total, subtotal
 cart.items[index].quantity--;
 cart.numItems--;
 cart.subtotal -= product.price;
 cart.items[index].total -= product.price;

 //remove if quantity is zero
 if (cart.items[index].quantity === 0) cart.items.splice(index,1);

 return cart
}

//remove from cart helper
export const removeFromCart = (cart,product,index) => {
 //modify cart
 cart.numItems -= product.quantity;
 cart.subtotal -= product.total;
 cart.items.splice(index,1);

 return cart;
}