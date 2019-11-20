import React, { Component } from "react";
import axios from "axios";
import getJwt from "../helpers/jwtHelpers";
import { getFromStorage, setInStorage } from "../utils/storage";
import { withRouter } from "react-router-dom";

class Authenticated extends Component{
    constructor(){
        super();
        this.state = {
            user: undefined,
            token: ''
        }
    }
    
    verifyLogin = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/userGet?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        this.setState({
                            token: token,
                        });
                    }
                })
                .catch(err => {
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                })
            }
            else{
                this.props.history.push('/login');
            }
        }

    componentDidMount(){
        this.verifyLogin();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
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
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Authenticated);