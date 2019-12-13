import React, { Component } from "react";
import Axios from "axios";
import styles from "./TaskOfTheMoment.module.css"
import cx from "classnames";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';

class TaskOfTheMoment extends Component{
    constructor(){
        super();
        this.state = {
            task: undefined,
            completed: undefined
        }
    }

    getTask = () => {
        Axios.get(`/taskget?username=${this.props.username}`)
            .then(res => {
                this.setState({
                    task: res.data.task,
                    completed: res.data.taskCompleted
                })
            })
    }

    handleTaskStatus = async () => {
        await Axios.post('/taskcompleted', {username: this.props.username, completed: this.state.completed})
            .then(() => {
                this.setState(prevState => {
                    return {completed: !prevState.completed}
                })
            })
    }

    componentDidMount(){
        this.getTask();
    }

    render(){
        return(
            <div className={cx(styles.container, "text-center")}>
                <h1 className={cx(styles.taskTitle)}>Task of the moment</h1>
                <hr/>
                <div>
                    {
                        this.state.task === undefined ? 
                        "No task for you at this moment"
                        : 
                        <div>
                            {this.state.task}
                            <hr/>
                            <button
                                onClick={this.handleTaskStatus}
                                className={"btn btn-success btn-sm"}>Completed
                            </button>
                            <span>
                                {
                                    this.state.completed === false ?
                                    <ClearIcon color="secondary"/>
                                    : <CheckIcon style={{ color: green[500] }}/>
                                }
                            </span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default TaskOfTheMoment;