import React, { Component } from "react";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import { Route, withRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminSegment from "./AdminSegment";

class AdminAuthenticated extends Component{
    constructor(){
        super();
        this.state = {
            user: undefined,
            token: ''
        }
    }
    
    verifyLogin = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/adminGet?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        this.setState({
                            token: token,
                        });
                    }
                })
                .catch(err => {
                    localStorage.removeItem('adminToken');
                    this.props.history.push('/admin-login');
                })
            }
            else{
                this.props.history.push('/admin-login');
            }
        }

    componentDidMount(){
        this.verifyLogin();
    }

    render(){
        // if(this.state.user === undefined){
        //     return(
        //         <div>
        //             <h1>Loading...</h1>
        //         </div>
        //     );
        // }

        return(
            <div>
                {/* {this.props.children} */}
                <Route exact path="/admin" component={AdminSegment}/>
            </div>
        )
    }
}

export default withRouter(AdminAuthenticated);