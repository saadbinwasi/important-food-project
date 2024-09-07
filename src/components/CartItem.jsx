import React, { useContext } from 'react'
import CartContext from '../store/CartContext';

function CartItem({...item}) {
 const cartCtx = useContext(CartContext);

 function handleIncrease() {
    cartCtx.addItem(item);  // Add one more of the same item
  }

  // Function to handle decreasing the quantity of the item
  function handleDecrease() {
    cartCtx.removeItem(item.id);  // Remove one item by id
  }
  return (
    <li className='cart-item'>
      <p>
        {item.name} - {item.quantity} X {item.price}
      </p>
      <p className='cart-item-actions'>
      <button onClick={handleDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </p>
    </li>
  )
}

export default CartItem
