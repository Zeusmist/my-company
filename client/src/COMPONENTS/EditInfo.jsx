import React, { Component } from "react";
import infoStyle from "./MyInfo.module.css";
import Axios from "axios";
import cx from "classnames";

class EditInfo extends Component{
    constructor(props){
        super(props);
        this.pictureInput = React.createRef();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            age: '',
            country: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            newPassword: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    updateInfo = async (info, stateInfo, newInfo, infoErr) => {
        if(this.state[stateInfo] !== ""){
            if(this.state[stateInfo].toLowerCase().trim() !== this.props[stateInfo].toLowerCase()){
                await Axios.post('/edit-info', {
                    username: this.props.username,
                    position: this.props.position,
                    [newInfo]: this.state[stateInfo].toLowerCase()
                })
                .then(res => {
                    if(!res.data.success) this.setState({[infoErr]: res.data.message});
                    else {
                        this.setState({
                            [stateInfo]: '',
                            [stateInfo+'Success']: true,
                            [infoErr]: undefined
                        })
                    }
                })
            } else {
                this.setState({[infoErr]: `New ${info} can't be the same as the current one`})
            }
        }
    }

    updatePicture = async () => {
        if(this.pictureInput.current.files[0]){
            const formdata = new FormData();
            formdata.append('username', this.props.username)
            formdata.append('position', this.props.position)
            formdata.append('newPicture', this.pictureInput.current.files[0])
            await Axios.post('/edit-picture', formdata, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            })
            .then(res => {
                if(!res.data.success) this.setState({pictureErr: res.data.message});
                else {
                    this.setState({
                        pictureSuccess: true,
                        pictureErr: undefined
                    })
                }
            })
        }
    }
    
    updatePassword = async () => {
        if(this.state.password !== "" && this.state.newPassword !== ""){
            await Axios.post('/edit-password', {
                username: this.props.username,
                position: this.props.position,
                password: this.state.password,
                newPassword: this.state.newPassword
            })
            .then( res => {
                if(!res.data.success){
                    this.setState({
                        passwordErr: res.data.message
                    })
                } else {
                    this.setState({
                        password: '',
                        newPassword: '',
                        passwordErr: undefined,
                        passwordSuccess: true
                    })
                }
            })
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.updateInfo('username', 'username', 'newUsername', 'usernameErr');
        this.updateInfo('first name', 'firstName', 'newFirstName', 'firstNameErr');
        this.updateInfo('last name', 'lastName', 'newLastName', 'lastNameErr');
        this.updateInfo('age', 'age', 'newAge', 'ageErr');
        this.updateInfo('country', 'country', 'newCountry', 'countryErr');
        this.updateInfo('address', 'address', 'newAddress', 'addressErr');
        this.updateInfo('phone', 'phone', 'newPhone', 'phoneErr');
        this.updateInfo('e-mail', 'email', 'newEmail', 'emailErr');
        this.updatePassword();
    }
    
    handlePictureSubmit = async (event) => {
        event.preventDefault();
        this.updatePicture();
    }


    render(){
        return (
            <div>
                <h1 className={cx(infoStyle.myInfoTitle, "text-center")}>Edit my info</h1>
                <hr/>
                <label>
                    {this.state.firstNameErr ? <span className="text-danger small">{this.state.firstNameErr}<br/></span> : null}
                    {this.state.firstNameSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>First name: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="firstName" 
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            placeholder="Enter new first name"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.lastNameErr ? <span className="text-danger small">{this.state.lastNameErr}<br/></span> : null}
                    {this.state.lastNameSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Last name: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="lastName" 
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            placeholder="Enter new last name"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.ageErr ? <span className="text-danger small">{this.state.ageErr}<br/></span> : null}
                    {this.state.ageSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Age: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="age" 
                            value={this.state.age}
                            onChange={this.handleChange}
                            placeholder="Enter new age"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.countryErr ? <span className="text-danger small">{this.state.countryErr}<br/></span> : null}
                    {this.state.countrySuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Country: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off"> 
                        <input
                            type="text" 
                            name="country" 
                            value={this.state.country}
                            onChange={this.handleChange}
                            placeholder="Enter new country"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.addressErr ? <span className="text-danger small">{this.state.addressErr}<br/></span> : null}
                    {this.state.addressSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Address: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="address" 
                            value={this.state.address}
                            onChange={this.handleChange}
                            placeholder="Enter new address"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.emailErr ? <span className="text-danger small">{this.state.emailErr}<br/></span> : null}
                    {this.state.emailSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>E-mail: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="email" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleChange}
                            placeholder="Enter new email"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.usernameErr ? <span className="text-danger small">{this.state.usernameErr}<br/></span> : null}
                    {this.state.usernameSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Username: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="username" 
                            value={this.state.username}
                            onChange={this.handleChange}
                            placeholder="Enter new username"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.passwordErr ? <span className="text-danger small">{this.state.passwordErr}<br/></span> : null}
                    <span className={this.state.passwordSuccess ? "text-success small" : "text-primary small"}>
                        {this.state.passwordSuccess ? "Updated succesfully" : "Min of 6 digits, max of 50 digits"}
                    </span><br/>
                    <h6 className={infoStyle.information}>Password: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Enter current password"
                            pattern="^.{6,50}$"
                        /><br/>
                        <input
                            type="password" 
                            name="newPassword" 
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                            placeholder="Enter new password"
                            pattern="^.{6,50}$"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.phoneErr ? <span className="text-danger small">{this.state.phoneErr}<br/></span> : null}
                    <span className={this.state.phoneSuccess ? "text-success small" : "text-primary small"}>
                        {this.state.phoneSuccess ? "Updated succesfully" : "Min of 10 digits, max of 15 digits"}
                    </span><br/>
                    <h6 className={infoStyle.information}>Phone: </h6>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            type="text" 
                            name="phone" 
                            value={this.state.phone}
                            onChange={this.handleChange}
                            placeholder="Enter new phone"
                            pattern="^.{10,15}$"
                        />
                        <button type="submit">Update</button>
                    </form>
                </label><br/>
                <label>
                    {this.state.pictureErr ? <span className="text-danger small">{this.state.pictureErr}<br/></span> : null}
                    {this.state.pictureSuccess ? <span className="text-success small">Updated succesfully<br/></span> : null}
                    <h6 className={infoStyle.information}>Picture: </h6>
                    <form onSubmit={this.handlePictureSubmit}>
                        <input
                            type="file" 
                            name="picture"
                            ref={this.pictureInput}
                        />
                        <button type="submit">Update</button>
                    </form>
                </label>
            </div>
        )
    }
}

export default EditInfo;