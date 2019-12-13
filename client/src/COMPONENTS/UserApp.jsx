import React from "react";
import { Route } from "react-router-dom";
import Index from "./Index";
import Register from "./Register";
import Login from "./Login";
import AdminLogin from "./AdminLogin";

function UserApp(){
    return(
        <div>
            <Route exact path="/" component={Index}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/admin-login" component={AdminLogin}/>
        </div>
    )
}

export default UserApp;