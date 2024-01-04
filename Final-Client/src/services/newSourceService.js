import axios from "axios"

const URL = 'http://localhost:4000/';

export const getSources = async () => {
    try {
        const result = await axios.get(`${URL}newsource`, { headers: { 'Content-Type': 'application/json' } });
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

export const createSource = async (data) => {
    console.log("data")
    console.log(data)
    try {
        //const result = await axios.post(`${URL}source`, data, { headers: { 'Content-Type': 'application/json' } });
        const result = await axios.post(`${URL}newsource`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
            return { error: false, data: result.data, msg: 'Elemento creado' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

export const deleteSource  = async (source) => {
    try {
        const result = await axios.delete(`${URL}newsource?id=${source}`, { headers: { 'Content-Type': 'application/json' } });
        //console.log(category+"hola1")
        if (result.status === 204) {
            return { error: false, data: null, msg: 'Elemento borrado' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(source+"hola2")
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

export const updateSource  = async (source) => {
    console.log("source._id");
   console.log(source._id);
    try {
        const result = await axios.patch(`${URL}newsource`, source, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, source: result.data, msg: 'Elemento guardado' };
        }
        return { error: true, source: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.source && error.response.source.msg) {
            return { error: true, source: null, msg: error.response.source.msg };
        }
        console.log(error.response)
        return { error: true, source: null, msg: 'Error interno del servidor' };
    }
}

