import React from "react";
import styles from "./MainContent.module.css";

export const MainContent = ({children}) => {
    return (
        <div className={`${styles.mainContent}`}>
            {children}
        </div>
    )
};