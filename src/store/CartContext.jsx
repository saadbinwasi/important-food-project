import {createContext, useReducer} from 'react'

 const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
  
    const updatedItems = [...state.items];
  
      if (existingCartItemIndex > -1) {
        // If the item already exists in the cart, update its quantity
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        // Update the item in the updatedItems array
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If the item is new, add it to the cart with a quantity of 1
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return {...state,items: updatedItems}
    }
  
if (action.type === 'REMOVE_ITEM') {
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id
  );

  if (existingCartItemIndex === -1) {
    // Item not found in the cart; nothing to do
    return state;
  }

  const existingCartItem = state.items[existingCartItemIndex];
  const updatedItems = [...state.items];

  if (existingCartItem.quantity === 1) {
    updatedItems.splice(existingCartItemIndex, 1);
  } else {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  }

  return { ...state, items: updatedItems };
}

if(action.type === 'CLEAR_CART'){
  return {...state,items: []}
}

  
    return state;
  }
  

export function CartContextProvider({children}) {

  const [cart,dispatch] = useReducer(cartReducer,{items: []}); 



  function addItem(item){
    dispatch({type: 'ADD_ITEM',item})
  
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_ITEM', id }); 
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' }); 
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  console.log(cartContext)


    return <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
}

export default CartContext;