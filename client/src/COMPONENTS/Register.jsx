import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Register.module.css";
import cx from "classnames";

class Register extends Component{
    constructor(){
        super();
        this.pictureInput = React.createRef();
        this.state = {
            res: undefined
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({res: undefined});

        const formData = new FormData();
        
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('age', this.state.age);
        formData.append('gender', this.state.gender);
        formData.append('position', this.state.position);
        formData.append('country', this.state.country);
        formData.append('address', this.state.address);
        formData.append('email', this.state.email);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('phone', this.state.phone);
        formData.append('picture', this.pictureInput.current.files[0]);
        
        fetch('/api/register', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                this.props.history.push('/login');
                // console.log(this.pictureInput.current.files)
                else this.setState({
                    res: data.message
                });
            })
            .catch(err => console.log(err))
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }
    
    render(){
        const image = "https://res.cloudinary.com/mca/image/upload/v1576274339/backgroundImages/companyPic3_gxpiy0.jpg";
        let res;
        if(this.state.res){
            res = this.state.res.replace(/"/g, "").charAt(0).toUpperCase() + this.state.res.replace(/"/g, "").slice(1);
        }
        return(
            <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
                <h3 className="text-center">My Company App Registration</h3>
                <div className={styles.containerCon}>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First name"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last name"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="text" 
                            name="age" 
                            placeholder="Age"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <div className="form-check border rounded bg-light">
                            Gender :<br/>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Male"
                                        onChange={this.handleChange}
                                        checked={this.state.gender === "Male"}
                                        className="form-check-input"
                                    />
                                    Male
                                </label>
                            </div>
                            <div className="form-check-inline">
                                <label className="form-check-label">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Female"
                                        onChange={this.handleChange}
                                        checked={this.state.gender === "Female"}
                                        className="form-check-input"
                                    />
                                    Female
                                </label>
                            </div>
                        </div><br/>
                        <label className="form-group">
                            <select
                                name="position"
                                onChange={this.handleChange}
                                value={this.state.position}
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
                        </label><br/>
                        <input 
                            type="text" 
                            name="country" 
                            placeholder="Country"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Address"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="Phone"
                            onChange={this.handleChange}
                            className="form-control"
                        /><br/>
                        <div className="form-group form-check bg-light border rounded pr-3">
                            Profile picture :
                            <input 
                                type="file" 
                                name="picture"
                                ref={this.pictureInput}
                                className="form-control-file border rounded-bottom"
                            />
                        </div>
                        {res ? <span className="text-danger">{res}</span> : null}
                        <button 
                            type="submit"
                            className={cx("btn btn-success btn-block")}>Sign Up</button>
                    </form>
                    <span className="text-warning" >
                        Already have an account?&nbsp;
                        <span 
                            onClick={this.handleLogin}
                            style={{textDecoration: "underline", cursor: "pointer"}}
                        >
                            Login.
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}

export default withRouter(Register);