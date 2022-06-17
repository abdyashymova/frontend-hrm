import React from 'react';
import styles from "./TableHeaderRemote.module.css";
import classNames from "classnames";

const TableHeaderRemote = () => {
    return (
        <div className={styles.TableBarHeader}>
            <div/>
            <div>
                <span className={styles.title}>Фамилия, инициалы, должность</span>
            </div>
            <div>
                <span className={styles.title}>Отметки о явках и неявках на работу по числам месяца</span>
            </div>
            <div>
                <span className={styles.title}>Часы</span>
            </div>
            <div>
                <span className={styles.title}>Все</span>
            </div>
            <div className={styles.day}>
                <span className={classNames(styles.title, styles.dayTitle)}>Дни</span>
            </div>
        </div>
    );
};

export default TableHeaderRemote;