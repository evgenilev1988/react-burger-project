import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = function(props) {
  return (
    <Aux>
      <Backdrop show={props.show} closeBackDrop={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(Modal, function(prevProp, nextProps) {
  return nextProps.show === prevProp.show && nextProps.children === prevProp.children;
});
