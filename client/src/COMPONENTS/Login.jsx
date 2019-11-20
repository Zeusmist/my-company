import React, { Component } from "react";
import { setInStorage } from "../utils/storage";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            res: undefined
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(async data => {
                if(data.success){
                    await axios.post('/myinfo-post', {username: this.state.username});
                    setInStorage('authToken', {token: data.token});
                    this.props.history.push('/my-info');
                }
                else this.setState({
                    res: data.message
                })
            })
    }

    render(){
        return(
            <div>
                {this.state.res ? <span>{this.state.res}</span> : null}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    /><br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);