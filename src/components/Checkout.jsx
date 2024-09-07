import React, { act, useContext } from 'react'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import UserProgressContext from '../store/UserProgessContext';
import Modal from './Modal';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },

}

function Checkout() {
   const cartCtx = useContext(CartContext)
   const UserProgressCtx = useContext(UserProgressContext)

  const {clearData, data,loading,error,sendRequest} = useHttp('http://localhost:3000/orders',requestConfig );

   const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price, 
    0
  );

  function handleClose() {
    UserProgressCtx.hideCheckout();
  }

  function handleFinish(){
    UserProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event){
    event.preventDefault();

    const fd = new FormData(event.target)
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
        JSON.stringify({
        order: {
            items: cartCtx.items,
            customer: customerData
        }}) 
    );


  }

  let actions = (
    <>
      <Button onClick={handleClose} type="button" textOnly>Close</Button>
            <Button textOnly>Submit Order</Button>
    </>
);

if(loading){
    actions = <span>Sending order data..</span>
}

if(data && !error){
  return <Modal open={UserProgressCtx.progress === 'checkout'} onClose={handleFinish}>
<h2>Success!</h2>
<p>Order has been Placed Successfully!</p>
<p className='modal-actions'>
<Button onClick={handleFinish}>Okay</Button>
</p>
  </Modal>
}

  return (
    <Modal onClose={handleClose} open={UserProgressCtx.progress === 'checkout'}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="name"/>
        <Input label="E-Mail Address" type="text" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className='control-roe'>
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="City" type="text" id="city"/>
        </div>

        {error && <Error title="Failed to submit order" message={error} />}
        <p className='modal-actions'>
          {actions}
        </p>
      </form>
    </Modal>
  )
}

export default Checkout
