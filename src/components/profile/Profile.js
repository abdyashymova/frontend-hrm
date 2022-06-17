import React from "react";
import styles from "./Profile.module.css";
import {ReactComponent as ProfileIcon} from "./../../media/icons/profile.svg";
import {ReactComponent as Logo} from "../../media/icons/logo.svg";

export const Profile = () => {
    return (
        <div className={`my-container ${styles.profileBar}`}>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <div className={styles.profile}>
                <ProfileIcon/>
                <p className={styles.profileName}>Имя руководителя</p>
            </div>
        </div>
    )
};