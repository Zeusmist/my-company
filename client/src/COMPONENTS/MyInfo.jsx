import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";

class MyInfo extends Component{
    constructor(){
        super();
        this.state = {
            
        }
    }

    getInfo = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/myinfo-get?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(data.success === false){
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                }
                else{
                    this.setState({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        gender: data.gender,
                        position: data.position,
                        country: data.country,
                        address: data.address,
                        email: data.email,
                        username: data.username,
                        phone: data.phone,
                        picture: data.picture
                    });
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            })
    }

    authExpiration = () => {
        const obj = getFromStorage('authToken');
        const token = obj.token;
        if (token){
            fetch(`/api/logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('authToken');
                    }
                })
        }
    }

    componentDidMount(){
        this.getInfo();
        this.interval = setInterval(() => this.authExpiration(), 60000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        return(
            <div>
                {this.state.error ? <h3>Opps, theres been an error, kindly login again</h3> : null}

                <img src={this.state.picture} alt={this.state.username}/>
                <h6>Username: {this.state.username}</h6>
                <h6>First name: {this.state.firstName}<br/>Last name: {this.state.lastName}</h6>
                <h6>Gender: {this.state.gender}</h6>
                <h6>Position: {this.state.position}</h6>
                <h6>Age: {this.state.age}</h6>

            </div>
        )
    }
}

export default MyInfo;