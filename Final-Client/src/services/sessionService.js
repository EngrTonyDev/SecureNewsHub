import axios from "axios"


const URL = 'http://localhost:4000/';

export const getSession = async () => {

    //decode token so user info can be used
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const dateObject = new Date(expiration);
    const now = new Date();
    if (!token || dateObject.getTime() < now.getTime()) {
        window.location.href = "/";
    }
    else {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const result = await axios.get(`${URL}session`,   token ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // add Authorization header with the token
                }
                // pass the token in the request body
            });
            if (result.status === 200) {
                
                return { error: false, data: result.data, msg: result.data.msg };
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

}



export const saveSession = async (data) => {

    try {
        const result = await axios.post(`${URL}session`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
            localStorage.setItem('token', result.data.token); // Store user data through token in localStorage

            localStorage.setItem('expiration', result.data.expire); // Store user data through token in localStorage
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            return { error: false, data: result.data, msg: 'Elemento creado' };
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