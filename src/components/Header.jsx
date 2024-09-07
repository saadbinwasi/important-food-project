import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgessContext';

function Header() {
   const Ctx = useContext(CartContext);
   const UserProgressCxt = useContext(UserProgressContext);

   const totalCartItems = Ctx.items.reduce((total,item) => {
   return total + item.quantity;
   },0)

   function handleShowCart(){
    UserProgressCxt.showCart();
   }

  return (
    <header id="main-header">
      <div id='title'>
        <img src={logo} alt='A resturant'/>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
