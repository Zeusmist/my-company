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
                <button onClick={this.toggleTask}>Add Task</button>
                {
                    this.state.addTask ?
                    <form onSubmit={this.handleSubmit}>
                        <textarea 
                            name="task"
                            value={this.state.task}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Send</button>
                    </form>
                    : null
                }
            </div>
        )
    }
}

export default AdminAddTaskButton;