import React, { Component } from "react";
import { getFromStorage } from "../../utils/storage";
import { Route, withRouter } from "react-router-dom";
import AdminStaffs from "./AdminStaffs";
import AdminStaffsPosition from "./AdminStaffsPosition";
import AdminSearchPage from "./AdminSearchPage";
import Nav from "./AdminNav";
import authStyle from "../Authenticated.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

class AdminAuthenticated extends Component{
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
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/adminGet?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        this.setState({
                            token: token,
                        });
                    }
                })
                .catch(err => {
                    localStorage.removeItem('adminToken');
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
                <div className={cx(authStyle.content)}>
                    <div className={cx(authStyle.header, "navbar navbar-expand-md bg-dark navbar-dark sticky-top")}>
                        <span 
                            className={cx(authStyle.openbtn, "navbar-toggler navbar-toggler-icon")} 
                            onClick={this.openNav}>
                        </span>
                        <Link to="/admin/dashboard" className={cx(authStyle.logo, "navbar-brand")}>
                            My Company App
                        </Link>
                    </div>
                    <div className="container-fluid">
                        <Route exact path="/admin/dashboard" component={AdminDashboard}/>
                        <Route exact path="/admin/staffs" component={AdminStaffs}/>
                        <Route exact path="/admin/ceo" render={(props) => <AdminStaffsPosition {...props} position="CEO"/>}/>
                        <Route exact path="/admin/cafeteria" render={(props) => <AdminStaffsPosition {...props} position="cafeteria"/>}/>
                        <Route exact path="/admin/customer-service" render={(props) => <AdminStaffsPosition {...props} position="customer service"/>}/>
                        <Route exact path="/admin/designers" render={(props) => <AdminStaffsPosition {...props} position="designer"/>}/>
                        <Route exact path="/admin/engineers" render={(props) => <AdminStaffsPosition {...props} position="engineer"/>}/>
                        <Route exact path="/admin/front-desk" render={(props) => <AdminStaffsPosition {...props} position="front desk"/>}/>
                        <Route exact path="/admin/human-resources" render={(props) => <AdminStaffsPosition {...props} position="human resources"/>}/>
                        <Route exact path="/admin/managers" render={(props) => <AdminStaffsPosition {...props} position="manager"/>}/>
                        <Route exact path="/admin/medical-administrators" render={(props) => <AdminStaffsPosition {...props} position="medical administrator"/>}/>
                        <Route exact path="/admin/researchers" render={(props) => <AdminStaffsPosition {...props} position="researcher"/>}/>
                        <Route exact path="/admin/sales-representatives" render={(props) => <AdminStaffsPosition {...props} position="sales representative"/>}/>
                        <Route exact path="/admin/secretaries" render={(props) => <AdminStaffsPosition {...props} position="secretary"/>}/>
                        <Route exact path="/admin/security" render={(props) => <AdminStaffsPosition {...props} position="security"/>}/>
                        <Route exact path="/admin/other" render={(props) => <AdminStaffsPosition {...props} position="other"/>}/>
                        <Route exact path="/admin/search" component={AdminSearchPage}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminAuthenticated);