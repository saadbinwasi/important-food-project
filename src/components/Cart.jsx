import React, { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgessContext';
import Button from './UI/Button';
import CartItem from './CartItem';

function Cart() {

   const cartCtx = useContext(CartContext);
   const UserProgressCxt = useContext(UserProgressContext);

   const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price, 
    0
  );

  function handleGotoCheckout(){
    UserProgressCxt.showCheckout();
  }

  function handleCloseCart(){
    UserProgressCxt.hideCart();
   }

  return (
    <Modal onClose={UserProgressCxt.progress === 'cart' ? handleCloseCart : null} className='cart' open={UserProgressCxt.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      </ul>
      {cartCtx.items.length > 0 ? <p className='total'>{currencyFormatter.format(cartTotal)}</p> : <p>Cart Is Empty</p>}
      <p className='modal-actions'>
        <Button onClick={handleCloseCart} textOnly>Close</Button>
       {cartCtx.items.length > 0 && <Button onClick={handleGotoCheckout} >Go To CheckOut</Button> }
      </p>
    </Modal>
  )
}

export default Cart
