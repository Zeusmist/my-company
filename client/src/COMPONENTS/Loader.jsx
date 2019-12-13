import React from "react";
import styles from "./Loader.module.css";

function Loader(){
    return(
        <div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Loader;