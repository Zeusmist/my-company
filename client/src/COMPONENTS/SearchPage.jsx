import React, { Component } from "react";
import { getFromStorage } from "../utils/storage";
import UserCard from "./UserCard";
import infoStyle from "./MyInfo.module.css";
import staffsStyle from "./Staffs.module.css";
import Loader from "./Loader";
import cx from "classnames";
import ReactPaginate from "react-paginate";

class SearchPage extends Component{
    constructor(){
        super();
        this.state = {
            staffs: [],
            error: undefined,
            isLoaded: false,
            offset: 0,
            data: [],
            elements: [],
            perPage: 12,
            currentPage: 0,
        }
    }

    getSearch = () => {
        const obj = getFromStorage('authToken');
        let token = undefined;
        if(obj !== null){
            token = obj.token;
        }
        fetch(`/search-get?token=${token}`)
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

    setCurrentPage = () => {
        const { staffs, offset, perPage } = this.state;
        let elements = staffs.slice(offset, offset + perPage).map(staff => (
            <li className={cx(staffsStyle.listCon,"col-md-6 col-lg-4")} key={staff.username}>
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

    componentDidMount(){
        this.getSearch();
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
                    previousLinkClassName={staffsStyle.paginateLink}
                    nextLinkClassName={staffsStyle.paginateLink}
                    disabledClassName={"disabled"}
                    activeClassName={staffsStyle.paginateActive}
                    pageLinkClassName={staffsStyle.paginateLink}
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
                        <h1 className={cx(infoStyle.myInfoTitle, "text-center")}>
                            Search results
                        </h1>
                        <hr/>
                        {paginationElement}
                        <ul className={cx(staffsStyle.listCon,"row")}>
                            {elements.length > 0 ? elements : "No results for your search"}
                        </ul>
                        {paginationElement}
                    </div>
                }
            </div>
        );
    }
}

export default SearchPage;