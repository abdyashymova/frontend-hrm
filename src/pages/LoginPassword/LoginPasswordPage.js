import React, {useState} from 'react';
import styles from './LoginPassword.module.css'
import classNames from 'classnames';
import {ReactComponent as Logo} from '../../media/icons/logo_white.svg';
import {useLocation, useNavigate} from "react-router-dom";
import {IMAGE_URL} from "../../constants";
import spinner from "../../media/gifs/1495.gif";
import {login} from "../../actions/auth.action";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {addDefaultSrc} from "../../helpers";


const LoginPasswordPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const [activeBtn, setActiveBtn] = useState('btn-not-active');
    const [userData, setUserData] = useState(location.state);
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const clickPasswordView = () => {
        setView(!view);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
        if(event.target.value.length > 0){
            setActiveBtn('btn-main');
        } else{
            setActiveBtn('btn-not-active');
        }
    }

    const clickLogin = () => {
        setIsPending(true);

        if(userData.email && password){
           dispatch(login(userData.email, password))
                .then(data => {
                    setIsPending(false);
                    navigate('/welcome');
                })
               .catch(statusError => {
                   if (statusError.status === 401){
                       toast.error('Пароль введен неверно');
                   } else {
                       toast.error('Ошибка сервера.');
                   }
                   setIsPending(false);
               })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Logo className={styles.logo}/>
                <div className={styles.myself}>
                    <img
                        src={IMAGE_URL + userData.image}
                        className={classNames(styles.user_img, 'mb-24')}
                        onError={addDefaultSrc}
                        alt="Пользователь"/>
                    <p className={classNames(styles.title)}>{userData.full_name}</p>
                    <p className={classNames(styles.title, 'mt-8')}>{userData.position}</p>
                    <p className={classNames(styles.title, 'mt-8')}>{userData.department}</p>
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="email">Пароль</label>
                    <div className={styles.password}>
                        <input
                            id="password"
                            type={view ? 'text' : 'password'}
                            placeholder="Введите пароль"
                            onChange={changePassword}
                            onKeyPress={(e)=>{
                                if (e.key === 'Enter') {
                                    clickLogin();
                                }
                            }}
                        />
                        <a
                            href="#"
                            className={classNames(styles.password_control, view ? styles.no_view : styles.view)}
                            onClick={clickPasswordView}
                        />
                    </div>
                    <a href="#" className={styles.forgot_password}>Забыли пароль?</a>
                    <button
                        className={classNames('btn mt-32', activeBtn)}
                        onClick={clickLogin}
                    >
                        {!isPending ? 'Далее' : <img className={styles.spinner} src={spinner} alt="...загрузка"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPasswordPage;