import axios from "axios"

const URL = 'http://localhost:4000/';

export const getCategories = async () => {
    try {
        const result = await axios.get(`${URL}category`, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            //console.log(result);
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

export const createCategory = async (data) => {
    console.log(data)
    try {
        const result = await axios.post(`${URL}category`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
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


export const deleteCategory = async (category) => {
   
    try {
        const result = await axios.delete(`${URL}category?id=${category}`, { headers: { 'Content-Type': 'application/json' } });
        //console.log(category+"hola1")
        if (result.status === 204) {
            return { error: false, data: null, msg: 'Elemento borrado' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(category+"hola2")
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

export const updateCategory = async (category) => {
    
    console.log("category");
    console.log(category);
   
    try {
        const result = await axios.patch(`${URL}category`, category, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, category: result.category, msg: 'Elemento guardado' };
        }
        return { error: true, category: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.category && error.response.category.msg) {
            return { error: true, category: null, msg: error.response.category.msg };
        }
        console.log(error.response)
        return { error: true, category: null, msg: 'Error interno del servidor' };
    }
}





