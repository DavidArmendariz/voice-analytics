import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { UserContext } from "./providers/UserProvider";
import SignIn from "views/SignIn/SignIn";
import { fetchMetadataStart } from "./redux/customermetadata/customermetadata.actions";
import { connect } from "react-redux";

const App = ({ fetchMetadataStart }) => {
  const user = useContext(UserContext);
  React.useEffect(() => {
    if (user) {
      fetchMetadataStart();
    }
  }, [fetchMetadataStart, user]);
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

const mapDispatchToProps = (dispatch) => ({
  fetchMetadataStart: () => dispatch(fetchMetadataStart()),
});

export default connect(null, mapDispatchToProps)(App);
