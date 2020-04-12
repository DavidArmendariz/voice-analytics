import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { UserContext } from "./providers/UserProvider";
import SignIn from "views/SignIn/SignIn";

const App = () => {
  const user = useContext(UserContext);
  return user ? (
    <div>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </div>
  ) : (
    <SignIn />
  );
};

export default App;
