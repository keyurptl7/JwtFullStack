import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard"

//history
import { history } from './helpers/history';

//pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Login"
import Signup from "./pages/Signup";

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <RouteGuard
                    exact
                    path="/"
                    component={HomePage}
                />
                <Route
                    path="/login"
                    component={LoginPage}
                />
                <Route
                    path="/signup"
                    component={Signup}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Routes
