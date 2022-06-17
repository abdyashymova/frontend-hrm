import AuthService from "../services/auth.service";
import {LOGIN_SUCCESS} from "./types";

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            if (data.status !== 200) return Promise.reject(data.status);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.responseJson,
            });

            return Promise.resolve();
        }
    );
};