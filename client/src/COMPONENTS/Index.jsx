import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import cx from "classnames";
import styles from "./Index.module.css";
import BackgroundSlider from "react-background-slider";

class Index extends Component{
    
    handleRegister = () => {
        this.props.history.push('/register')
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    render(){
        const image1 = "https://res.cloudinary.com/mca/image/upload/v1576274298/backgroundImages/companyPic1_fsoqvx.jpg";
        const image2 = "https://res.cloudinary.com/mca/image/upload/v1576274339/backgroundImages/companyPic3_gxpiy0.jpg";
        const image3 = "https://res.cloudinary.com/mca/image/upload/v1576274351/backgroundImages/companyPic4_fqz34o.jpg";
        const image4 = "https://res.cloudinary.com/mca/image/upload/v1576274333/backgroundImages/companyPic2_z62n1e.jpg";

        return(
            <div>
                <BackgroundSlider
                    images={[image1, image2, image3, image4]}
                    duration={2} transition={2}
                />
                <div className={styles.containerCon}>
                    <h1 className={cx("text-center")}>My Company App</h1>
                    <div className="text-center">
                        <button onClick={this.handleRegister} className={cx(styles.btn, styles.btnWarning)}>
                            Register
                        </button>
                        <button onClick={this.handleLogin} className={cx(styles.btn,styles.btnSuccess)}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Index);