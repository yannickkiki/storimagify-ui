import React from 'react';
import {Route, Redirect} from "react-router-dom";

import {Urls} from "../data";

function CustomReactRoute({component: Component, exact = true, ...rest}) {
  const isUserAuthenticated = localStorage.getItem("userToken");
  return (
    <Route
      exact
      {...rest}
      render={function (props) {
        if (isUserAuthenticated) {
          return <Component {...props} />
        }
        else {
          return <Redirect to={Urls.login.base}/>
        }
      }}
    />
  );
}

export default CustomReactRoute;
