import React from 'react';
import styles from "./TableHeaderStaffRate.module.css";

const TableHeaderStaffRate = () => {
    return (
        <div className={styles.tableHeader}>
            <div/>
            <div>
                <span className={styles.title}>Фамилия, инициалы, должность</span>
            </div>
            <div>
                <span className={styles.title}>Ко (до 0,2)</span>
            </div>
            <div>
                <span className={styles.title}>Квз (до 0,7)</span>
            </div>
            <div>
                <span className={styles.title}>Комментарии</span>
            </div>
            <div>
                <span className={styles.title}>Квыр (до 0,1)</span>
            </div>
            <div>
                <span className={styles.title}>Кэ (max 2,0)</span>
            </div>
        </div>
    );
};

export default TableHeaderStaffRate;