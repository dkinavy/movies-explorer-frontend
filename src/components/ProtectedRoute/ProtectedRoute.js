import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  // isLoggedIn = true;
  // console.log(props.isLoggedIn)
  return (
    <Route>
      {
        props.isLoggedIn === true ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
