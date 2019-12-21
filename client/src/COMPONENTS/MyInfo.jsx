import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";
import TaskOfTheMoment from "./TaskOfTheMoment";
import cx from "classnames";
import styles from "./MyInfo.module.css";
import EditInfo from "./EditInfo";
import Loader from "./Loader";

class MyInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            edit: props.toggleEdit,
            firstName: '',
            lastName: '',
            country: '',
            age: '',
            isLoaded: false
        }
    }

    getInfo = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/myinfo-get?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(data.success === false){
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                }
                else{
                    this.setState({
                        isLoaded: true,
                        date: new Date(data.date).toDateString().slice(4),
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        gender: data.gender,
                        position: data.position,
                        country: data.country,
                        address: data.address,
                        email: data.email,
                        username: data.username,
                        phone: data.phone,
                        picture: data.picture
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err.message
                });
            })
    }

    authExpiration = () => {
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
                    }
                })
        }
    }

    componentDidMount(){
        this.getInfo();
        this.interval = setInterval(() => this.authExpiration(), 3600000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { date, firstName, lastName, username, position, age, 
            country, address, phone, email, picture, gender, error, isLoaded  } = this.state;
        const errorElement = <h3>Opps, theres been an error, kindly login again</h3>;
        const taskElement = <TaskOfTheMoment username={username}/>;
        const infoElement = 
            <div>
                {taskElement}
                <h1 className={cx(styles.myInfoTitle, "text-center")}>My Information</h1>
                    <hr/>
                    <div className={"row"}>
                        <div className="col-3">
                            <div  
                                className={cx(styles.imgResponsive)}
                                style={{backgroundImage: `url(${picture})`}}>
                            </div>
                        </div>
                        <div className={cx(styles.info,"col-9")}>
                            <h4>{firstName.charAt(0).toUpperCase() + firstName.slice(1)} {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</h4>
                            <h5>@{username}</h5>
                            <div><h6 className={styles.information}>Date of Employment:</h6> <p className={styles.information}>{date}</p></div>
                            <div><h6 className={styles.information}>Position:</h6> <p className={styles.information}>{position}</p></div>
                            <div><h6 className={styles.information}>Gender:</h6> <p className={styles.information}>{gender}</p></div>
                            <div><h6 className={styles.information}>Age:</h6> <p className={styles.information}>{age}</p></div>
                            <div><h6 className={styles.information}>Country:</h6> <p className={styles.information}>{country.charAt(0).toUpperCase() + country.slice(1)}</p></div>
                            <div><h6 className={styles.information}>Address:</h6> <p className={styles.information}>{address}</p></div>
                            <div><h6 className={styles.information}>E-mail:</h6> <p className={styles.information}>{email}</p></div>
                            <div><h6 className={styles.information}>Phone:</h6> <p className={styles.information}>{phone}</p></div>
                            </div>
                    </div>
            </div>;

        return(
            <div className={styles.container}>
                {!isLoaded ? 
                    <Loader/>
                    : error ? 
                    errorElement
                    : this.props.toggleEdit ?
                    <EditInfo 
                        username={username} 
                        position={position} 
                        firstName={firstName} 
                        lastName={lastName}
                        age={age.toString()}
                        country={country}
                        address={address}
                        phone={phone}
                        email={email}
                    />
                    : username ? 
                    infoElement 
                    : null }
            </div>
        )
    }
}

export default MyInfo;