import React, { Component } from "react";
import cx from "classnames";
import styles from "./AdminDashboardStatCount.module.css";
import PersonIcon from '@material-ui/icons/Person';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CategoryIcon from '@material-ui/icons/Category';

class AdminDashboardStatCount extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        const { sidebar, count, title } = this.props;
        return (
            <div className={cx(styles.statCount, `col-lg bg-${sidebar==="staffs"?'dark':sidebar==="positions"?'danger':sidebar==="logged"?'success':'primary' }`)}>
                <div className={cx(styles.sidebar)}>
                    {
                        sidebar === "staffs" ?
                            <PersonIcon style={{ fontSize: 70 }} color="disabled"/>
                            : sidebar === "positions" ? 
                                <CategoryIcon style={{ fontSize: 70}} color="disabled"/>
                                : sidebar === "logged" ?
                                    <PersonPinIcon style={{ fontSize: 70}} color="disabled"/>
                                    : null
                    }
                </div>
                <div className={cx(styles.count)}>
                    <h3 className="font-weight-lighter">
                        {count ? count :<span className="spinner-border spinner-border-sm"></span> }<br/>{title}
                    </h3>
                </div>
            </div>
        )
    }
}

export default AdminDashboardStatCount;