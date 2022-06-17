import React from 'react';
import {useSelector} from "react-redux";
import styles from './Modal.module.css';


/**************** фон для модалки *****************/
export const BackdropModal = () => {
    const state = useSelector(state => state.modal.backdropModal);

    return (
        <div className={`${styles.modalBackdrop} ${styles[state]}`}/>
    )
};

/**************** внизу с красным фоном *****************/
export const ErrorApiModal = () => {
    const state = useSelector(state => state.modal.failApiModal);
    const txt = useSelector(state => state.modal.failApiTxt);

    return (
        <div className={`${styles.errorModal} ${styles[state]}`}>
            <div className={styles.errorModalContent}>
                <div className={styles.errorApiModalContainer}>
                    <h3>Произошла ошибка. Перезагрузите или обратитесь к администратору.</h3>
                    <h3>Код ошибки: {txt}</h3>
                </div>
            </div>
        </div>
    )
};
