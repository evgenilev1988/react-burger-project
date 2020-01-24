import { useState, useEffect } from "react";

export default function HttpClient(axios) {
    
  const [error, setError] = useState(null);

  const axiosReq = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const axiosRes = axios.interceptors.response.use(
    res => res,
    error => {
      setError(error);
      return error;
    }
  );

  useEffect(
    function() {
      return () => {
        axios.interceptors.request.eject(axiosReq);
        axios.interceptors.response.eject(axiosRes);
      };
    },
    [axiosReq, axiosRes,axios.interceptors.request,axios.interceptors.response]
  );

  const errorConfirmedhandler = function() {
    setError(null);
  };

  return {error: error,clearErrorMethod:errorConfirmedhandler};
};
