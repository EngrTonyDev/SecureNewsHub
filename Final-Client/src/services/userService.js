import axios from "axios"

const URL = 'http://localhost:4000/';


export const createUser = async (data) => {
    //console.log("data:"+data)
    try {
        //const result = await axios.post(`${URL}source`, data, { headers: { 'Content-Type': 'application/json' } });
        const result = await axios.post(`${URL}user`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
            return { error: false, data: result.data, msg: 'Elemento creado' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        
        console.log("error:")
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}



export const getUser = async (data) => {//returns just one user
    
    
    try {
        const result = await axios.get(`${URL}user?email=${data.email}&password=${data.password}`, { headers: { 'Content-Type': 'application/json' } });
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