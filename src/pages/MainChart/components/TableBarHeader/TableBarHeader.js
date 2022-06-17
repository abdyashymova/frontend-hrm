import styleTableBarHeader from "./TableBarHeader.module.css";
import styleHelpBar from "../HelpBar/HelpBar.module.css";
import React from "react";

const TableBarHeader = () => {
    return (
        <div className={styleTableBarHeader.TableBarHeader}>
            <div/>
            <div>
                <span className={styleTableBarHeader.title}>Фамилия, инициалы, должность</span>
            </div>
            <div>
                <span className={styleTableBarHeader.title}>Отметки о явках и неявках на работу по числам месяца</span>
            </div>
            <div>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.workedOut}`}><span
                    className={styleHelpBar.commonSign}>P</span></div>
            </div>
            <div>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.mission}`}><span
                    className={styleHelpBar.commonSign}>К</span></div>
            </div>
            <div>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.sickLeave}`}><span
                    className={styleHelpBar.commonSign}>Б</span></div>
            </div>
            <div>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.furlough}`}><span
                    className={styleHelpBar.commonSign}>О</span></div>
            </div>
            <div>
                <div className={`${styleHelpBar.helpsBlock} ${styleHelpBar.coefficient}`}><span
                    className={styleHelpBar.commonSign}>К.Э</span></div>
            </div>
        </div>
    )
}

export default TableBarHeader;