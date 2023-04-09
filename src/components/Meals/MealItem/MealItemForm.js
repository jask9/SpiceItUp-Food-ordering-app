import React, { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityAsNum = +enteredQuantity;

    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantityAsNum < 1 ||
      enteredQuantityAsNum > 5
    ) {
      setQuantityIsValid(false);
      return;
    }

    props.onAddToCart(enteredQuantityAsNum);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "quantity_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!quantityIsValid && <p>Please enter a valid quantity(1-5).</p>}
    </form>
  );
}

export default MealItemForm;
