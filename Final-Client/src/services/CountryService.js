import axios from "axios"

const URL = 'https://restcountries.com/v2';

export const getCountriesList = async () => {
    try {
        const result = await axios.get(`${URL}/all`);
        if (result.status === 200) {
            return { error: false, data: result.data, msg: '' };
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
