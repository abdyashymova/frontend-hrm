import React, {useEffect, useState} from 'react';
import styles from './Login.module.css';
import {ReactComponent as Logo} from "../../media/icons/logo_white.svg";
import classNames from "classnames";
import spinner from "../../media/gifs/1495.gif";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-hot-toast";
import AuthService from "./../../services/auth.service";

const LoginPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeBtn, setActiveBtn] = useState('btn-not-active');
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState('');

    //проверка на наличие в конце @megacom.kg
    const checkEmail = (email) => {
        const regex = /@megacom\.kg$/i;
        return regex.test(email);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
        if (checkEmail(e.target.value)) {
            setActiveBtn('btn-main');
        }
    }

    const checkStatus = () => {
        let status = searchParams.get("status");
        if (+status === 1) {
            toast.error('Текущий сеанс истек');
        }
    }

    useEffect(checkStatus, [])

    const clickOnwards = () => {
        if (checkEmail(email)) {
            setIsPending(true);
            if (email) {
                AuthService.checkEmail(email)
                    .then(data => {
                        setIsPending(false);
                        if (data.status === 200) {
                            navigate('password', {state: {email: email, ...data.responseJson}});
                        } else if (data.status === 404) {
                            toast.error('Email не существует');
                        } else {
                            toast.error('Произошла ошибка. Код ошибки: ' + data.status);
                        }
                    })
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Logo className={styles.logo}/>
                <div className={styles.input_container}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Введите Email"
                        onChange={changeEmail}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                clickOnwards();
                            }
                        }}
                    />
                    <button
                        className={classNames('btn mt-32', activeBtn)}
                        onClick={clickOnwards}>
                        {!isPending ? 'Далее' : <img className={styles.spinner} src={spinner} alt="...загрузка"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;