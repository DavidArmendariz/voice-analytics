import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { connect } from "react-redux";
import { fetchEmployeesStart } from "./redux/employees/employees.actions";
import { UserContext } from "./providers/UserProvider";
import SignIn from "views/SignIn/SignIn";

const App = ({ fetchEmployeesStart }) => {
  useEffect(() => {
    fetchEmployeesStart();
  }, [fetchEmployeesStart]);

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

const mapDispatchToProps = dispatch => ({
  fetchEmployeesStart: () => dispatch(fetchEmployeesStart())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
