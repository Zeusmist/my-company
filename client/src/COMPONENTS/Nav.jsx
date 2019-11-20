import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../utils/storage";

class Nav extends Component{
    constructor(){
        super();
        this.state = {
            search: ''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    searchStaff = async (event) => {
        event.preventDefault();
        const { search } = this.state
        axios.post('search-post', {search: search.charAt(0).toUpperCase() + search.slice(1)})
            .then(() => {
                this.props.history.push('/search');  
            })
    }

    handleLogout = () => {
        const obj = getFromStorage('authToken');
        const token = obj.token;
        if (token){
            fetch(`/api/logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('authToken');
                        this.props.history.push('/login');
                    }
                })
                // .catch(err => {
                //     localStorage.removeItem('authToken');
                //     this.props.history.push('/login');
                // })
        }
    }
    
    render(){
        return(
            <nav>
                <Link to="/register">
                    <p>Sign Up</p>
                </Link>
                <Link to="/login">
                    <p>Sign in</p>
                </Link>
                <Link to="/staffs">
                    <p>All Staffs</p>
                </Link>
                <Link to="/engineers">
                    <p>Enginners</p>
                </Link>
                <Link to="/ceo">
                    <p>CEO</p>
                </Link>
                <Link to="/other">
                    <p>Others</p>
                </Link>
                <button onClick={this.handleLogout}>Logout</button>
                <form onSubmit={this.searchStaff}>
                    <input 
                        type="text"
                        name="search"
                        value={this.state.search}
                        onChange={this.handleChange}
                    />
                    <button type="submit">search</button>
                </form>
            </nav>
        )
    }
}

export default withRouter(Nav);