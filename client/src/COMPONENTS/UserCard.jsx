import React from "react";
import cx from "classnames";
import styles from "./UserCard.module.css";
import infoStyle from "./MyInfo.module.css";


function UserCard(props){
    const { picture, firstName, lastName, username, date, 
        position, gender, age, country, email } = props;
    return(
        <div className={cx(styles.card, "container card")}>
            <div className={cx("card-header row")}>
                <div className="col-4"></div>
                <div className="col-4">
                    <div
                        className={infoStyle.imgResponsive}
                        style={{backgroundImage: `url(${picture})`}}>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
            <div className={cx("card-title text-center")}>
                <h4 style={{marginBottom: "0px"}}>{firstName.charAt(0).toUpperCase()+firstName.slice(1)+" "
                +lastName.charAt(0).toUpperCase()+lastName.slice(1)}</h4>
                <h6>@{username.toLowerCase()}</h6>
            </div>
            <div className={cx("card-body")}>
                <div>
                    <h6 className={infoStyle.information}>Date of Employment: </h6>
                    <p className={infoStyle.information}>{date}</p>
                </div>
                <div>
                    <h6 className={infoStyle.information}>Position: </h6>
                    <p className={infoStyle.information}>{position}</p>
                </div>
                <div>
                    <h6 className={infoStyle.information}>Gender: </h6>
                    <p className={infoStyle.information}>{gender.charAt(0).toUpperCase()+gender.slice(1)}</p>
                </div>
                <div>
                    <h6 className={infoStyle.information}>Age: </h6>
                    <p className={infoStyle.information}>{age}</p>
                </div>
                <div>
                    <h6 className={infoStyle.information}>Country: </h6>
                    <p className={infoStyle.information}>{country.charAt(0).toUpperCase()+country.slice(1)}</p>
                </div>
                <div>
                    <h6 className={infoStyle.information}>E-mail: </h6>
                    <p className={infoStyle.information}>{email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard;