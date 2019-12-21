import React, { Component } from "react";
import { getFromStorage } from "../../utils/storage"
import AdminDashboardStatCount from "./AdminDashboardStatCount";
import AdminChart from "./AdminChart";
import Loader from '../Loader';
import infoStyle from "../MyInfo.module.css";
import cx from "classnames";

class AdminDashboard extends Component{
    constructor(){
        super();
        this.state = {
            isLoaded: false,
        }
    }

    handleCount = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/admin-staffGet?token=${token}`)
            .then(res => res.json())
            .then(data => this.setState({staffCount: data.length}))
            .catch(err => {this.setState({error: err.message})});

        fetch(`/admin-onlineGet?token=${token}`)
            .then(res => res.json())
            .then(data => this.setState({onlineCount: data.staffs.length + data.admins.length}))
            .catch(err => {this.setState({error: err.message})});
    }

    handleChartData = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }

        fetch(`/admin-chart-position-data?token=${token}`)
            .then(res => res.json())
            .then(data => {
                let label = data.datasets[0].label;
                let BDdata1 = data.datasets[0].data.slice(0,5);
                let BDbackground1 = data.datasets[0].backgroundColor.slice(0,5);
                let BDdatasets1 = [{label: label, data: BDdata1, backgroundColor: BDbackground1}]
                let BDdata2 = data.datasets[0].data.slice(5,10);
                let BDbackground2 = data.datasets[0].backgroundColor.slice(5,10);
                let BDdatasets2 = [{label: label, data: BDdata2, backgroundColor: BDbackground2}]
                let BDdata3 = data.datasets[0].data.slice(10,14);
                let BDbackground3 = data.datasets[0].backgroundColor.slice(10,14);
                let BDdatasets3 = [{label: label, data: BDdata3, backgroundColor: BDbackground3}]
                this.setState({
                    barData1: {
                        labels: data.labels.slice(0, 5),
                        // datasets: data.datasets,
                        datasets: BDdatasets1
                    },
                    barData2: {
                        labels: data.labels.slice(5, 10),
                        datasets: BDdatasets2
                    },
                    barData3: {
                        labels: data.labels.slice(10, 14),
                        datasets: BDdatasets3
                    },
                })
            })
            .catch(err => {this.setState({error: err.message})});

            fetch(`/admin-chart-task-data?token=${token}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    pieData: {
                        labels: data.labels,
                        datasets: data.datasets
                    },
                    isLoaded: true
                })
            })
            .catch(err => {this.setState({error: err.message, isLoaded: true})});
    }

    authExpiration = () => {
        const obj = getFromStorage('adminToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        if (token){
            fetch(`/api/logout?token=${token}`)
                .then( res => res.json())
                .then(data => {
                    if(data.success){
                        localStorage.removeItem('adminToken');
                    }
                })
        }
    }

    componentDidMount(){
        this.handleCount();
        this.handleChartData();
        this.interval = setInterval(() => this.authExpiration(), 3600000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { staffCount, onlineCount, error, isLoaded } = this.state;
        return(
                !isLoaded ? 
                    <Loader/>
                    : error ?
                        <h3>Opps, there's been an error, try logging in again.</h3>
                        :
                        <div className="container" style={{paddingBottom: "20px"}}>
                            <h1 className={cx(infoStyle.myInfoTitle, "text-center")}>
                                Dashboard
                            </h1>
                            <hr/>
                            <div className="row text-center">
                                <AdminDashboardStatCount sidebar="staffs" count={staffCount} title="Staffs"/>
                                <AdminDashboardStatCount sidebar="positions" count="13" title="Positions"/>
                                <AdminDashboardStatCount sidebar="logged" count={onlineCount} title="Online"/>
                            </div>
                            <div>
                                <AdminChart type="pie" data={this.state.pieData}/>
                            </div>
                            <div>
                                <AdminChart type="bar" data={this.state.barData1}/>
                            </div>
                            <div>
                                <AdminChart type="bar" data={this.state.barData2}/>
                            </div>
                            <div>
                                <AdminChart type="bar" data={this.state.barData3}/>
                            </div>
                        </div>
        )
    }
}

export default AdminDashboard;