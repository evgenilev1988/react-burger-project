import React from "react";

import useHttpErrorHandler from "../../hooks/http-error-handler";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandling = (WrappedComponent, axios) => {
  return function(props) {
    const {error, clearErrorMethod} = useHttpErrorHandler(axios);
    
    return (
      <Aux>
        <WrappedComponent { ...props }  />
        <Modal show={error} modalClosed={clearErrorMethod}>
          {error ? error.message : null}
        </Modal>
      </Aux>
    );
  };
};

export default withErrorHandling;
