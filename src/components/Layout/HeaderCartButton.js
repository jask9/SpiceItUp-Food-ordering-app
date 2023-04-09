import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const numOfCartItems = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.quantity;
  }, 0);

  // reduce() is a javascript method that executes a user-supplied "reducer" callback function on each element of the array, in order,
  // passing in the return value from the calculation on the preceding element.
  // The final result of running the reducer across all elements of the array is a single value.

  //  IN THE ABOVE CASE-
  //  the currentNum is set to zero, coz of the initial value we supplied to reduce() as the second argument
  //  on first execution of reduce(), as the mthod goes through each item in the array (second argument of callback fn named "item"),
  //  it gets the item.quantity and adds it to the currentNum value that was zero initially
  //  on each execution, that is for each item of the array, the method runs, and the next item.quantity gets added to previous value (sum),
  //  thus returning a single value in the end, which is the sum total of all items in the array, that is the quantity or number of items in the cart

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
