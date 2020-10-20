import React, {Component} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
import PrivateRoute from "./views/components/PrivateRoute";
import jwt_decode from "jwt-decode";
import {Provider} from "react-redux";
import store from "./store";
import {setCurrentUser, logoutUser} from "./actions/authActions";
const loading = () => <div className="sk-rotating-plane" />;

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./views/Pages/Login/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./views/Pages/Register/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404/Page404"),
  loading
});


if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}





class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <Route path="/404" exact name="Page 404" component={Page404} />
            <PrivateRoute path="/" name="Home"  component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
