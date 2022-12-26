import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from '../pages/Auth/Login';
import MainLayout from '../pages/Layout/MainLayout';
function LoginRoutes() {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/MainLayout"><MainLayout /> </Route>
                    <Route path="/"><Login /> </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default LoginRoutes