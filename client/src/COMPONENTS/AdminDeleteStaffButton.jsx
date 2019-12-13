import React, { Component } from "react";
import axios from "axios";

class AdminDeleteStaffButton extends Component{
    constructor(){
        super();
        this.state = {
            confirmation: false,
            deleted: false
        }
    }

    handleClick = () => {
        this.setState(prevState => {
            return {
                confirmation: !prevState.confirmation
            }
        })
    }

    handleConfirmationYes = async (e) => {
        e.persist();
        await axios.post('/admin-deletestaff', {username:this.props.username , position: this.props.position});
        this.setState({confirmation: false, deleted: true});
    }

    handleConfirmationNo = () => {
        this.setState({confirmation: false});
    }

    render(){
        return(
            <div>
                <button onClick={this.handleClick} disabled={this.state.deleted}>
                    {
                        this.state.deleted === true ? 
                        "Deleted"
                        : "Delete staff"
                    }
                </button>
                {
                    this.state.confirmation === true ?
                    <span>
                        Are you sure you want to delete staff?
                        <button onClick={this.handleConfirmationYes}>Yes</button>
                        <button onClick={this.handleConfirmationNo}>No</button>
                    </span>
                    : null
                }
            </div>
        )
    }
}

export default AdminDeleteStaffButton;