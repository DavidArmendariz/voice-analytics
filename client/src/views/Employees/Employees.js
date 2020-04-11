import React from "react";
import { Route } from "react-router-dom";
import EmployeesList from "../Employees/EmployeesList";
import EmployeesAnalytics from "../Employees/EmployeesAnalytics";

const Employees = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={EmployeesList} />
      <Route
        path={`${match.path}/:employeeUid`}
        component={EmployeesAnalytics}
      />
    </div>
  );
};

export default Employees;
