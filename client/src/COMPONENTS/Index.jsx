import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import { withRouter } from "react-router-dom";

class Index extends Component{
    render(){
        return(
            <div>
                <h3>Sign Up</h3>
                <Register/>
                <h3>Login</h3>
                <Login/>
            </div>
        )
    }
}

export default withRouter(Index);