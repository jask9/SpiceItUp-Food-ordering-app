import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducerFn(state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.addedItem.price * action.addedItem.quantity;

    // first check if item is already part of array (already in cart), so that it name gets added only once, but quantity chnages accordingly
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.addedItem.id
    ); // checks if the item we are currently looking at in the array (i.e item.id) has the same id as the item we are adding through the action now (action.item.id), and returns the index of that item if true

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    //  if existingCartItem is true, that is it exists already
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.addedItem.quantity, //this copies existingCartItem object and then just quantity is updated
      };
      updatedItems = [...state.items]; //update the array by copying existing items into a new array
      updatedItems[existingCartItemIndex] = updatedItem; //overwrite the old item we found with the new updated item
    } else {
      // to add new items to array using state, where state.items gives latest state snapshot of all items in the array
      updatedItems = state.items.concat(action.addedItem);
      // concat adds new item to an array, but unlike push() doesn't edit existing array, but creates a new array
      // concat used here so that our state snapshot isn't changed in any way coz it's used for reference
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.removedId
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    // if that item is the last item in the cart, like say, only 1 dal makhni left, then on remove it should be completely removed from the cart
    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.removedId);
    } else {
      // else the item stays in cart but its quantity reduces by one
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // to clear the cart after order submission
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducerFn,
    defaultCartState
  );

  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "ADD", addedItem: item });
  }

  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: "REMOVE", removedId: id });
  }

  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
