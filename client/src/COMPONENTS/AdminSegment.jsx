import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";
import AdminAddTaskButton from "./AdminAddTaskButton";
import AdminDeleteStaffButton from "./AdminDeleteStaffButton";

class AdminSegment extends Component{
    constructor(){
        super();
        this.state = {
            staffs: [],
            // toggleEdit: false,
            // toggleTask: false,

        }
    }

    getStaffs = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/admin-staffGet?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    this.setState({
                        staffs: data
                    })
                }
                else{
                    localStorage.removeItem('adminToken');
                    this.props.history.push('/admin-login');
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    }

    authExpiration = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/api/logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('adminToken'); 
                    }
                })
        }
    }
    
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
                <h6>Gender: {staff.gender}, Age: {staff.age}</h6>
                <h6>Position: {staff.position}</h6>
                <AdminAddTaskButton username={staff.username}/>
                <AdminDeleteStaffButton username={staff.username} position={staff.position.toLowerCase()}/>
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

export default AdminSegment;