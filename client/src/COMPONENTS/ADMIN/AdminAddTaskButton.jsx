import React, { Component } from "react";
import axios from "axios";

class AdminAddTaskButton extends Component{
    constructor(){
        super();
        this.state = {
            addTask: false,
            task: undefined
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/admin-taskpost', {username: this.props.username, task: this.state.task});
        this.setState(prevState => {
            return {
                addTask: !prevState.addTask
            }
        })
    }

    toggleTask = () => {
        this.setState(prevState => {
            return {
                addTask: !prevState.addTask
            }
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                <button className="btn btn-outline-secondary btn-sm" onClick={this.toggleTask}>Add Task</button>
                {
                    this.state.addTask ?
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <textarea
                            name="task"
                            value={this.state.task}
                            onChange={this.handleChange}
                            className="form-control"
                        />
                        <button className="btn btn-success btn-sm" type="submit">Add</button>
                    </form>
                    : null
                }
            </div>
        )
    }
}

export default AdminAddTaskButton;