import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";

class Staffs extends Component{
    constructor(){
        super();
        this.state = {
            staffs: [],
            error: undefined,
        }
    }

    getStaffs = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/staffGet?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    this.setState({
                        staffs: data
                    })
                }
                else{
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
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
        this.getStaffs();
        this.interval = setInterval(() => this.authExpiration(), 60000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const staffElement = this.state.staffs.map(staff => (
            <li key={staff.username}>
                <img src={staff.picture} alt={staff.username}/>
                <h6>Username: {staff.username}</h6>
                <h6>First name: {staff.firstName}<br/>Last name: {staff.lastName}</h6>
                <h6>Gender: {staff.gender}</h6>
                <h6>Position: {staff.position}</h6>
                <h6>Age: {staff.age}</h6>
            </li>
        ));

        return(
            <div>
                {this.state.error ? 
                    <h3>Opps, there's been an error, try logging in again.</h3> 
                    : null}
                <ul>
                    {staffElement}
                </ul>
            </div>
        );
    }
}

export default Staffs;