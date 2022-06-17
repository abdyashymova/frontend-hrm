import React from 'react';
import {useSelector} from "react-redux";
import styles from './Preloader.module.css'

export const Preloader = () => {
    const state = useSelector(state => state.modal.preloader);

    return ( state === 'show' ? <div className={`${styles.loader} ${styles[state]}`}>
        <div className={styles.outer}/>
        <div className={styles.middle}/>
        <div className={styles.inner}/>
    </div>  : null )
};