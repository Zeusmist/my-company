import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../../utils/storage";
import navStyle from "../Nav.module.css";
import cx from "classnames";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

class AdminNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            showDropdown: false
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    searchStaff = async (event) => {
        event.preventDefault();
        const { search } = this.state
        axios.post('/admin-search-post', {search: search.charAt(0).toUpperCase() + search.slice(1)})
            .then(() => {
                this.props.history.push('/admin/search');  
            })
    }

    handleLogout = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/api/admin-logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('adminToken');
                        this.props.history.push('/login');
                    }
                })
        }
    }

    toggleDropdown = () => {
        this.setState(prevState => {
            return {
                showDropdown: !prevState.showDropdown
            }
        })
    }
    
    render(){
        return(
            <nav className={cx(navStyle.sidebar)} ref={this.props.navElement}>
                <button
                    className={navStyle.closebtn}
                    onClick={this.props.closeFun}
                >&times;
                </button>
                <div className={cx(navStyle.contactMe)}>
                    <a href="https://github.com/zeusmist" rel="noopener noreferrer" target="_blank"><GitHubIcon fontSize="large"/></a>
                    <a href="https://ng.linkedin.com/in/david-obidu" rel="noopener noreferrer" target="_blank"><LinkedInIcon fontSize="large"/></a>
                    <a href="https://www.instagram.com/zeusmist/" rel="noopener noreferrer" target="_blank"><InstagramIcon fontSize="large"/></a>
                </div>
                <Link to="/admin/dashboard">
                    Dashboard
                </Link>
                <Link to="/admin/staffs">
                    All Staffs
                </Link>
                
                <div className={cx("dropdown")}>
                    <button className={cx(navStyle.positions, "dropdown-toggle")} onClick={this.toggleDropdown}>
                        Staffs by position
                    </button>
                    {
                        this.state.showDropdown ?
                        <div className={cx(navStyle.positionDropdown)}>
                            <Link to="/admin/ceo" className={navStyle.dropdownItems}>
                                CEO
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/cafeteria" className={navStyle.dropdownItems}>
                                Cafeteria
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/customer-service" className={navStyle.dropdownItems}>
                                Customer service
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/designers" className={navStyle.dropdownItems}>
                                Desginers
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/engineers" className={navStyle.dropdownItems}>
                                Engineers
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/front-desk" className={navStyle.dropdownItems}>
                                Front desk
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/human-resources" className={navStyle.dropdownItems}>
                                Human resources
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/managers" className={navStyle.dropdownItems}>
                                Managers
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/medical-administrators" className={navStyle.dropdownItems}>
                                Medical administrators
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/researchers" className={navStyle.dropdownItems}>
                                Researchers
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/sales-representatives" className={navStyle.dropdownItems}>
                                Sales representatives
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/secretaries" className={navStyle.dropdownItems}>
                                Secretaries
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/security" className={navStyle.dropdownItems}>
                                Security
                            </Link>
                            <div className={navStyle.dropdownDividers}></div>
                            <Link to="/admin/other" className={navStyle.dropdownItems}>
                                Others
                            </Link>
                        </div>
                        : null
                    }
                </div>
                
                <form onSubmit={this.searchStaff} className={navStyle.searchForm}>
                    <label>
                        Search staffs<br/>
                        <input 
                            className={"form-control form-control-sm"}
                            type="text"
                            name="search"
                            value={this.state.search}
                            onChange={this.handleChange}
                            placeholder="First, last, user name"
                        />
                    </label>
                    <button className={"btn btn-sm btn-outline-secondary"} type="submit">search</button>
                </form>
                <button 
                    onClick={this.handleLogout}
                    className={cx(navStyle.logout, "btn btn-danger")}>Logout
                </button>
            </nav>
        )
    }
}

export default withRouter(AdminNav);