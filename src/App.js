import { useState } from 'react';
import { useEffect } from 'react';
import { Routes,Route } from "react-router-dom";
import { Box,useDisclosure } from "@chakra-ui/react";
import { 
  findInCart,
  deepClone, 
  addToCart, 
  subtractFromCart, 
  removeFromCart  
} from './cartHelpers';
import Header from './Components/Header';
import CartDrawer from './Components/cart/CartDrawer';
import ProductGrid from "./Components/products/ProductGrid";
import { useSuccessToast } from './hooks';
import CheckoutPage from './Components/checkout/CheckoutPage';
import modifyList from './Functions';

function App() {

  //state
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState({items: [], numItems: 0, subtotal: 0});

  //hooks
  const toast = useSuccessToast();

  //get cart from local storage
  useEffect( ()=> {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) setCart(cart);

    async function getProducts() {
      const URL = 'https://fakestoreapi.com/products';
      const resp = await fetch(URL);
      const products = await resp.json();
      const shuffled = modifyList(products);
      setProducts(shuffled);
    }

    getProducts();
},[])

  //cart drawer controls
  const {isOpen,onOpen,onClose} = useDisclosure();

  //modify cart
  const modifyCart = (product,action) => {
    const index = findInCart(cart,product);
    const clone = deepClone(cart);
    
    //add,subract,or remove
    let newCart;

    switch (action) {
      case 'add' :
        newCart = addToCart(clone,product,index);
        toast('Cart','Item Added.');
        break;
      case 'subtract' :
        newCart = subtractFromCart(clone,product,index);
        toast('Cart','Item Removed.');
        break;
      case 'remove' :
        newCart = removeFromCart(clone,product,index);
        toast('Cart','Item Removed.');
        break;
      default: return null;
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  return (
    <Box bgColor='tan' pb='100px' minH='100vh'>
        {/* Header */}
        <Header openCart={onOpen} cartCount={cart.numItems}/>

        {/* Routes */}
        <Routes>
        <Route path='/' element={<ProductGrid modifyCart={modifyCart} products={products} />} />
          <Route path='/e-commerce-app/' element={<ProductGrid modifyCart={modifyCart} products={products} />} />
          <Route path='/e-commerce-app/checkout' element={
            <CheckoutPage cart={cart} setCart={setCart} modifyCart={modifyCart} />
          } />
        </Routes>

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isOpen}
          onClose={onClose}
          cart={cart}
          numItems={cart.numItems}
          modifyCart={modifyCart}
        />
    </Box>
  );
}

export default App;
