import React, { Component } from "react";
import Axios from "axios";

class AdminChangePositionButton extends Component {
    constructor(){
        super();
        this.state = {
            changePosition: false,
            isSuccessful: false,
        }
    }

    toggleChange = () => {
        this.setState(prevState => {
            return {
                changePosition: !prevState.changePosition
            }
        })
    }
    
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleConfirmationYes = async () => {
        await Axios.post('/admin-changeposition', {username: this.props.username.toLowerCase().trim(), 
            position: this.props.position.toLowerCase().trim(),
            newPosition: this.state.position})
            .then(() => {
                this.setState(prevState => {
                    return {
                        changePosition: !prevState.changePosition
                    }
                });
                this.setState({position: undefined, isSuccessful: true});
            })
        }
        
    handleConfirmationNo = () => {this.setState({changePosition: false, position: undefined})}

    render(){
        const { changePosition, position, isSuccessful } = this.state;
        const Pposition = this.props.position;
        return(
            <div>
                <button className="btn btn-outline-secondary btn-sm" onClick={this.toggleChange}>Change position</button>
                {
                    changePosition ? 
                        <select
                            name="position"
                            onChange={this.handleChange}
                            value={position}
                            className="form-control"
                        >
                            <option>-- Select Position --</option>
                            <option value="Cafeteria">Cafeteria</option>
                            <option value="Customer service">Customer Service</option>
                            <option value="Designer">Designer</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Front desk">Front Desk</option>
                            <option value="Human resources">Human Resources</option>
                            <option value="Manager">Manager</option>
                            <option value="Medical administrator">Medical Administrator</option>
                            <option value="Researcher">Researcher</option>
                            <option value="Sales representative">Sales Representative</option>
                            <option value="Secretary">Secretary</option>
                            <option value="Security">Security</option>
                            <option value="Other">Other</option>
                        </select>
                        : null
                }
                {
                    position && position !== "-- Select Position --" && position !== Pposition? 
                    <span className="small">
                        Are you sure you want to change positon from {Pposition} to {position}?<br/>
                        <button className="btn btn-success btn-sm mr-1" onClick={this.handleConfirmationYes}>Yes</button>
                        <button onClick={this.handleConfirmationNo} className="btn btn-danger btn-sm">No</button>
                    </span>
                    : null
                }
                {
                    position === Pposition ?
                    <span className="small text-warning">Cannot change to same position</span>
                    : null
                }
                {
                    isSuccessful ?
                    <span className="small text-success">Successfully changed</span>
                    : null
                }
            </div>
        )
    }
}

export default AdminChangePositionButton;