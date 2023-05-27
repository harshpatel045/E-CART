import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
} from '../constants/userConstants';
import axios from 'axios';

// Login User
export const loginUser = (email, password) => async (dispatch) => {
    try {

        console.log("hello");
        dispatch({ type: LOGIN_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data  } = await axios.post(
            'http://localhost:3000/api/v1/login',
            { email, password },
            config
        );

        console.log(data)
        window.localStorage.setItem('token',data.token);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.post(
            'http://localhost:3000/api/v1/register',
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });
        let token = localStorage.getItem('token');
        console.log(token)
        const { data } = await axios.get('http://localhost:3000/api/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        // console
        // console.log(token)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        console.log("There is a error");
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        localStorage.removeItem('cartItems')
        localStorage.removeItem("shippingInfo")
        localStorage.removeItem('wishlistItems')
        localStorage.removeItem('saveForLaterItems')

        await axios.get('http://localhost:3000/api/v1/logout', {
            headers: {
                Authorization: `Bearer ${token}`
            }});
            localStorage.removeItem('token')

        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User
export const updateProfile = (userData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.put(
            'http://localhost:3000/api/v1/me/update',
            userData, {
                headers: {
                    Authorization: `Bearer ${token}`
    }}
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            'http://localhost:3000/api/v1/password/update',
            passwords, {
                headers: {
                    Authorization: `Bearer ${token}`
                            }}
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        
        const config = {
            headers: {
                "Content-Type": "application/json",

            },
        }

        const { data } = await axios.post(
            'http://localhost:3000/api/v1/password/forgot',
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `http://localhost:3000/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Users ---ADMIN
export const getAllUsers = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token')
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get('http://localhost:3000/api/v1/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }});
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users,
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Details ---ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:3000/api/v1/admin/user/${id}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Details ---ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `http://localhost:3000/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User ---ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST });
        const { data } = await axios.delete(`http://localhost:3000/api/v1/admin/user/${id}`);

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};