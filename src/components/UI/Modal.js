import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
}

function ModalOverlay(props) {
  return <div className={classes.modal}>{props.children}</div>;
}

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onHideCart}/>, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
}

export default Modal;
