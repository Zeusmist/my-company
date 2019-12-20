import React, { Component } from "react";
import { setInStorage } from "../utils/storage";
import axios from "axios";
import { withRouter } from "react-router-dom";
import BackgroundSlider from "react-background-slider";
import indexStyle from "./Index.module.css"
import cx from "classnames"

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            res: undefined,
            isAdmin: false
        }
    }

    handleRegister = () => {
        this.props.history.push('/register')
    }

    handleAdminLogin = () => {
        this.setState(prevState => {
            return {
                isAdmin: !prevState.isAdmin
            }
        })
    }
    
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({res: undefined});

        fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(async data => {
            if(data.success){
                await axios.post('/myinfo-post', {username: this.state.username});
                setInStorage('authToken', {token: data.token});
                this.props.history.push('/user/my-info');
            }
            else this.setState({
                res: data.message
            })
        })
    }

    handleAdminSubmit = (event) => {
        event.preventDefault();

        fetch('/api/admin-login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(async data => {
                if(data.success){
                    await axios.post('/myinfo-post', {username: this.state.username});
                    setInStorage('adminToken', {token: data.token});
                    this.props.history.push('/admin/dashboard');
                }
                else this.setState({
                    res: data.message
                })
            })
    }
    
    render(){
        const image1 = "https://res.cloudinary.com/mca/image/upload/v1576274298/backgroundImages/companyPic1_fsoqvx.jpg";
        const image2 = "https://res.cloudinary.com/mca/image/upload/v1576274339/backgroundImages/companyPic3_gxpiy0.jpg";
        const image3 = "https://res.cloudinary.com/mca/image/upload/v1576274351/backgroundImages/companyPic4_fqz34o.jpg";
        const image4 = "https://res.cloudinary.com/mca/image/upload/v1576274333/backgroundImages/companyPic2_z62n1e.jpg";
        let res;
        if(this.state.res){
            res = this.state.res.replace(/"/g, "").charAt(0).toUpperCase() + this.state.res.replace(/"/g, "").slice(1);
        }
        return(
            <div>
                <BackgroundSlider
                    images={[image1, image2, image3, image4]}
                    duration={2} transition={2}
                />
                <h3 className="text-center pt-3">My Company App</h3>
                <div className={indexStyle.containerCon}>
                    {res ? <span className="text-danger">{res}</span> : null}
                    <form 
                        autoComplete="off"
                        className="text-center form-group" 
                        onSubmit={this.state.isAdmin ? this.handleAdminSubmit : this.handleSubmit}
                    >
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            className={cx( "form-control")}
                        /><br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={cx("form-control")}
                        /><br/>
                        <button type="submit" className={cx("btn btn-success btn-block")}>
                            {this.state.isAdmin ? "Login admin" : "Login"}
                        </button>
                    </form>
                    <span 
                        onClick={this.handleAdminLogin} 
                        className="text-warning" 
                        style={{textDecoration: "underline", cursor: "pointer"}}
                    >
                        {this.state.isAdmin ? "Login as staff" : "Login as admin"}
                    </span><br/>
                    <span 
                        onClick={this.handleRegister} 
                        className="text-warning"
                    >
                        Don't have an account? &nbsp;
                        <span style={{textDecoration: "underline", cursor: "pointer"}}>
                            Register now
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);