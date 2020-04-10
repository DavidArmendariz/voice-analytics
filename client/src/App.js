import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { connect } from "react-redux";
import { fetchEmployeesStart } from "./redux/employees/employees.actions";

const App = ({ fetchEmployeesStart }) => {
  useEffect(() => {
    fetchEmployeesStart();
  }, [fetchEmployeesStart]);

  return (
    <div>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchEmployeesStart: () => dispatch(fetchEmployeesStart())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
