import React, { Component } from "react";

class Signup extends Component{
    constructor(){
        super();
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
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                age: this.state.age,
                gender: this.state.gender,
                position: this.state.position,
                country: this.state.country,
                address: this.state.address,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone,
                picture: this.state.picture
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success)
                this.props.history.push('/login');
                else this.setState({
                    res: data.message
                });
            })
    }
    
    render(){
        return(
            <div>
                {this.state.res ? <span>{this.state.res}</span> : null}
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="First name"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last name"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="text" 
                        name="age" 
                        placeholder="Age"
                        onChange={this.handleChange}
                    /><br/>
                    <label>
                        Gender<br/>
                        <label>
                            Male
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Male"
                                onChange={this.handleChange}
                                checked={this.state.gender === "Male"}
                            />
                        </label><br/>
                        <label>
                            Female
                            <input 
                                type="radio" 
                                name="gender" 
                                value="Female"
                                onChange={this.handleChange}
                                checked={this.state.gender === "Female"}
                            />
                        </label><br/>
                    </label><br/>
                    <label>
                        Position<br/>
                        <select
                            name="position"
                            onChange={this.handleChange}
                            value={this.state.position}
                        >
                            <option>-- Select --</option>
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
                    /><br/>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Phone"
                        onChange={this.handleChange}
                    /><br/>
                    <input 
                        type="text" 
                        name="picture" 
                        placeholder="Link to image"
                        onChange={this.handleChange}
                    /><br/>
                    <button 
                        type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signup;