import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref}/>
    </div>
  );
});

export default Input;

// {/* <label htmlFor={props.input.id}>{props.label}</label>
// props.input means our Input component will have a prop named input which will hold an object with some properties(keyvalue pairs) and props.input.id gives access to id of the object stored in input prop
// props.label means Input component has a prop k/a label */}

// TRICK TO ADD ALL CONFIGURATIONS PASSED AS PROPS TO OUR COMPONENT USING SPREAD OPERATOR
// using spread operator in <input {...props.input}/>, we ensure that all the key value pairs, that the object in input prop holds, get added as props to our inut element in the Input component
// example: if input object is equal to {type: "text"}, then the following gets added as prop to the input element by the spread operator
// <input type="text" />
// the props passed this way can be the default input element attributes (like step, min, max, type) thus helping in making it highly configurable
