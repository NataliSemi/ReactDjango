import axios from 'axios'
import { PRODUCT_DETAILS_FAIL } from '../constants/productConstants';
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL

 } from '../constants/userConstants'; 

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }


        const { data } = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
 
    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            paload: error.resposne && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}



export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }


        const { data } = await axios.post(
            '/api/users/register/',
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
 
    } catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            paload: error.resposne && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}
