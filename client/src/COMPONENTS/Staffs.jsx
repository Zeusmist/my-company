import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";
import UserCard from "./UserCard";
import styles from "./Staffs.module.css";
import cx from "classnames";
import infoStyle from "./MyInfo.module.css";

class Staffs extends Component{
    constructor(){
        super();
        this.state = {
            isLoaded: false,
            staffs: [],
            error: undefined,
            offset: 0,
            data: [],
            elements: [],
            perPage: 12,
            currentPage: 0,
        }
    }

    getStaffs = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/staffGet?token=${token}`)
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    this.setState({
                        isLoaded: true,
                        staffs: data,
                        pageCount: Math.ceil(data.length / this.state.perPage)
                    })
                }
                else{
                    localStorage.removeItem('authToken');
                    this.props.history.push('/login');
                }
            })
            .then(() => {this.setCurrentPage();})
            .catch(err => {
                this.setState({
                    isLoaded: true,
                    error: err.message
                })
            })
    }

    setCurrentPage = () => {
        const { staffs, offset, perPage } = this.state;
        let elements = staffs.slice(offset, offset + perPage).map(staff => (
            <li className={cx(styles.listCon,"col-md-6 col-lg-4")} key={staff.username}>
                <UserCard
                    picture={staff.picture}
                    firstName={staff.firstName}
                    lastName={staff.lastName}
                    username={staff.username}
                    date={new Date(staff.date).toDateString().slice(4)}
                    position={staff.position}
                    gender={staff.gender}
                    age={staff.age}
                    country={staff.country}
                    email={staff.email}
                />
            </li>
        ));
        this.setState({elements: elements});
    }

    handlePageChange = (data) => {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.setCurrentPage();
        });
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
        this.getStaffs();
        this.interval = setInterval(() => this.authExpiration(), 60000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        const { pageCount, currentPage, isLoaded, error, elements } = this.state;
        let paginationElement;
        if(pageCount > 1){
            paginationElement = (
                    <ReactPaginate
                    previousLabel={"«"}
                    nextLabel={"»"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageChange}
                    forcePage={currentPage}
                    containerClassName={"pagination flex-wrap"}
                    previousLinkClassName={styles.paginateLink}
                    nextLinkClassName={styles.paginateLink}
                    disabledClassName={"disabled"}
                    activeClassName={styles.paginateActive}
                    pageLinkClassName={styles.paginateLink}
                    pageClassName={"page-item"}
                    breakClassName={"page-item"}
                    />
              );
        }

        return(
            <div className="container">
                { !isLoaded ? 
                    <Loader/>
                    : error ?
                    <h3>Opps, there's been an error, try logging in again.</h3>
                    :
                    <div>
                        <h1 className={cx(infoStyle.myInfoTitle, "text-center")}>All Staffs</h1>
                        <hr/>
                        {paginationElement}
                        <ul className={cx(styles.listCon,"row")}>
                            {elements}
                        </ul>
                        {paginationElement}
                    </div>
                }
            </div>
        );
    }
}

export default Staffs;