import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";
import { Route, withRouter } from "react-router-dom";
import Nav from "./Nav";
import MyInfo from "./MyInfo";
import Staffs from "./Staffs";
import SearchPage from "./SearchPage";
import StaffsPositions from "./StaffsPosition";
import styles from "./Authenticated.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";

class Authenticated extends Component{
    constructor(){
        super();
        this.sideBar = null;
        this.openNav = () => {
            if (this.sideBar){
                this.sideBar.style.width = "200px"
            }
        }
        this.closeNav = () => {
                this.sideBar.style.width = "0px"
        }
        
        this.state = {
            user: undefined,
            token: ''
        }
    }
    
    verifyLogin = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/userGet?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        this.setState({
                            token: token,
                        });
                    }
                })
                .catch(err => {
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                })
        } 
        else{
                this.props.history.push('/login');
        }
    }
    
    componentDidMount(){
        this.verifyLogin();
    }

    render(){
        return(
            <div>
                <Nav navElement={el => this.sideBar = el} closeFun={this.closeNav}/>
                <div className={cx(styles.content)}>
                    <div className={cx(styles.header, "navbar navbar-expand-md bg-dark navbar-dark sticky-top")}>
                        <span 
                            className={cx(styles.openbtn, "navbar-toggler navbar-toggler-icon")} 
                            onClick={this.openNav}>
                        </span>
                        <Link to="/user/my-info" className={cx(styles.logo, "navbar-brand")}>
                            My Company App
                        </Link>
                    </div>
                    {/* {this.props.children} */}
                    <div className="container-fluid">
                        <Route exact path="/user/my-info" render={(props) =><MyInfo {...props} toggleEdit={false}/>}/>
                        <Route exact path="/user/my-info/edit" render={(props) =><MyInfo {...props} toggleEdit={true}/>}/>
                        <Route exact path="/user/staffs" component={Staffs}/>
                        <Route exact path="/user/ceo" render={(props) => <StaffsPositions {...props} position="CEO"/>}/>
                        <Route exact path="/user/cafeteria" render={(props) => <StaffsPositions {...props} position="cafeteria"/>}/>
                        <Route exact path="/user/customer-service" render={(props) => <StaffsPositions {...props} position="customer service"/>}/>
                        <Route exact path="/user/designers" render={(props) => <StaffsPositions {...props} position="designer"/>}/>
                        <Route exact path="/user/engineers" render={(props) => <StaffsPositions {...props} position="engineer"/>}/>
                        <Route exact path="/user/front-desk" render={(props) => <StaffsPositions {...props} position="front desk"/>}/>
                        <Route exact path="/user/human-resources" render={(props) => <StaffsPositions {...props} position="human resources"/>}/>
                        <Route exact path="/user/managers" render={(props) => <StaffsPositions {...props} position="manager"/>}/>
                        <Route exact path="/user/medical-administrators" render={(props) => <StaffsPositions {...props} position="medical administrator"/>}/>
                        <Route exact path="/user/researchers" render={(props) => <StaffsPositions {...props} position="researcher"/>}/>
                        <Route exact path="/user/sales-representatives" render={(props) => <StaffsPositions {...props} position="sales representative"/>}/>
                        <Route exact path="/user/secretaries" render={(props) => <StaffsPositions {...props} position="secretary"/>}/>
                        <Route exact path="/user/security" render={(props) => <StaffsPositions {...props} position="security"/>}/>
                        <Route exact path="/user/other" render={(props) => <StaffsPositions {...props} position="other"/>}/>
                        <Route exact path="/user/search" component={SearchPage}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Authenticated);