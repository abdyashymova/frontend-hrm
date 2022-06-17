import React from "react";
import styles from "./Header.module.css";
import {ReactComponent as Logo} from "./../../media/icons/logo.svg";
import {ReactComponent as Profile} from "./../../media/icons/profile.svg";

export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo/>
            <div className={styles.profile}>
               <Profile/>
               <p className={styles.profileName}>Имя руководителя</p>
            </div>
        </header>
    )
};