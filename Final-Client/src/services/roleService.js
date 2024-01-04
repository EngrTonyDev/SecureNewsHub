import axios from "axios"


const URL = 'http://localhost:4000/';

export const getRole = async (role_id) => {//returns just one user
    
    
    try {
        const result = await axios.get(`${URL}role?id=${role_id}`, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            
            if(result.data.name==="regular"){
                window.location.href = "/news";
            }else{
                if(result.data.name==="admin"){
                    window.location.href = "/categories";
                }
            }
            
            return { error: false, data: result.data, msg: result.data.msg };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}