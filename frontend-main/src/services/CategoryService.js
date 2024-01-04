import axios from "axios"

const URL = 'http://localhost:4000/api';

export const getCategories = async () => {
    try {
        const result = await axios.get(`${URL}/categories`, { headers: { 'Content-Type': 'application/json' } });
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

export const deleteCategory = async (category) => {
    try {
        const result = await axios.delete(`${URL}/categories?id=${category._id}`, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 204) {
            return { error: false, data: null, msg: 'Elemento borrado' };
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


export const createCategory = async (data) => {
    try {
        const result = await axios.post(`${URL}/categories`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
            return { error: false, data: result.data.data, msg: 'Elemento creado' };
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


export const updateCategory = async (data) => {
    try {
        const result = await axios.patch(`${URL}/categories?id=${data._id}`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, data: result.data.data, msg: 'Elemento guardado' };
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
