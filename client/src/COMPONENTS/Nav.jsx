import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
import styles from "./Nav.module.css";
import cx from "classnames";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

class Nav extends Component{
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
        axios.post('/search-post', {search: search.charAt(0).toUpperCase() + search.slice(1)})
            .then(() => {
                this.props.history.push('/user/search');  
            })
    }

    handleLogout = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/api/logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('authToken');
                        this.props.history.push('/login');
                    }
                })
                // .catch(err => {
                //     localStorage.removeItem('authToken');
                //     this.props.history.push('/login');
                // })
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
            <nav className={cx(styles.sidebar)} ref={this.props.navElement}>
                <button
                    className={styles.closebtn}
                    onClick={this.props.closeFun}
                >&times;
                </button>
                <div className={cx(styles.contactMe)}>
                    <a href="http://github.com" rel="noopener noreferrer" target="_blank"><GitHubIcon fontSize="large"/></a>
                    <a href="http://linkedin.com" rel="noopener noreferrer" target="_blank"><LinkedInIcon fontSize="large"/></a>
                    <a href="http://instagram.com" rel="noopener noreferrer" target="_blank"><InstagramIcon fontSize="large"/></a>
                </div>
                <Link to="/user/my-info">
                    My task
                </Link>
                <Link to="/user/staffs">
                    All Staffs
                </Link>
                
                <div className={cx("dropdown")}>
                    <button className={cx(styles.positions, "dropdown-toggle")} onClick={this.toggleDropdown}>
                        Staffs by position
                    </button>
                    {
                        this.state.showDropdown ?
                        <div className={cx(styles.positionDropdown)}>
                            <Link to="/user/ceo" className={styles.dropdownItems}>
                                CEO
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/cafeteria" className={styles.dropdownItems}>
                                Cafeteria
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/customer-service" className={styles.dropdownItems}>
                                Customer service
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/designers" className={styles.dropdownItems}>
                                Desginers
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/engineers" className={styles.dropdownItems}>
                                Engineers
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/front-desk" className={styles.dropdownItems}>
                                Front desk
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/human-resources" className={styles.dropdownItems}>
                                Human resources
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/managers" className={styles.dropdownItems}>
                                Managers
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/medical-administrators" className={styles.dropdownItems}>
                                Medical administrators
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/researchers" className={styles.dropdownItems}>
                                Researchers
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/sales-representatives" className={styles.dropdownItems}>
                                Sales representatives
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/secretaries" className={styles.dropdownItems}>
                                Secretaries
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/security" className={styles.dropdownItems}>
                                Security
                            </Link>
                            <div className={styles.dropdownDividers}></div>
                            <Link to="/user/other" className={styles.dropdownItems}>
                                Others
                            </Link>
                        </div>
                        : null
                    }
                </div>
                <Link to="/user/my-info/edit">
                    Edit my info
                </Link>
                
                <form onSubmit={this.searchStaff} className={styles.searchForm}>
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
                    className={cx(styles.logout, "btn btn-danger")}>Logout
                </button>
            </nav>
        )
    }
}

export default withRouter(Nav);