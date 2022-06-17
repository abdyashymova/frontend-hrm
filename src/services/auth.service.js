import {BASE_URL} from "../constants";

class AuthService {
    /*************************** вход, получение прав  ***************************/
    login(email, password){
        const url = BASE_URL + 'access-token/';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
        };

        return fetch(url,options).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
            .then((responseJson) => {
                localStorage.setItem("user",JSON.stringify(responseJson))
                return { status:200, responseJson };
            })
            .catch((errorStatus) => {
                return Promise.reject({ status:errorStatus });
            });
    }

    /*************************** проверка аккаунта  ***************************/
    checkEmail(email){
        const url = BASE_URL + 'staff/login-search/?email=' + email;

        return fetch(url).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response.status;
            }
        })
            .then((responseJson) => {
                return { status:200, responseJson };
            })
            .catch((errorStatus) => {
                return { status:errorStatus };
            });
    }

    /*************************** выход  ***************************/
    logout(){
        localStorage.removeItem("user");
    }
}

export default new AuthService();