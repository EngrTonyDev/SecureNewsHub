import axios from "axios"

const URL = 'http://localhost:4000/api';

export const login2FA = async (data) => {
    try {
        const result = await axios.post(`${URL}/auth/login2FA`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, data: null, msg: result.data.msg };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }

}

export const verifyPhoneCode = async (data) => {
    try {
        const result = await axios.post(`${URL}/auth/verifyPhoneCode`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, data: { token: result.data.token }, msg: result.data.msg };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

export const register = async (data) => {
    try {
        const result = await axios.post(`${URL}/auth/register`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, data: null, msg: result.data.msg };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}