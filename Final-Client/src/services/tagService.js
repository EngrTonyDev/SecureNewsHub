import axios from "axios"

const URL = 'http://localhost:4000';

export const getTags = async () => {
    try {
        const result = await axios.get(`${URL}/tags`, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, data: result.data.data, msg: result.data.msg };
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
