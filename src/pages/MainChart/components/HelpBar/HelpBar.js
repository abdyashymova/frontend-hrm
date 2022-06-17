import styleHelpBar from "./HelpBar.module.css";
import styles from "../../MainChart.module.css";
import React from "react";

const HelpBar = () => {
    return (
        <div className={styleHelpBar.helpBar}>
            <div className={styleHelpBar.helps}>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.workedOut} ${styles.mr8}`}><span
                    className={styleHelpBar.commonSign}>P</span></div>
                <span className={styleHelpBar.helpsTitle}>Отработано</span>
            </div>
            <div className={styleHelpBar.helps}>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.mission} ${styles.mr8}`}><span
                    className={styleHelpBar.commonSign}>К</span></div>
                <span className={styleHelpBar.helpsTitle}>Командировочные</span>
            </div>
            <div className={styleHelpBar.helps}>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.sickLeave} ${styles.mr8}`}><span
                    className={styleHelpBar.commonSign}>Б</span></div>
                <span className={styleHelpBar.helpsTitle}>Больничные</span>
            </div>
            <div className={styleHelpBar.helps}>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.furlough} ${styles.mr8}`}><span
                    className={styleHelpBar.commonSign}>О</span></div>
                <span className={styleHelpBar.helpsTitle}>Отпуск</span>
            </div>
            <div className={styleHelpBar.helps}>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.coefficient} ${styles.mr8}`}><span
                    className={styleHelpBar.commonSign}>К.Э</span></div>
                <span className={styleHelpBar.helpsTitle}>Коэффициент</span>
            </div>
        </div>
    )
}

export default HelpBar;