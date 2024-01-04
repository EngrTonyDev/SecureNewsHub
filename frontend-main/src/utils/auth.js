import jwt_decode from "jwt-decode";


export const isLogin = () => {
    if (localStorage.getItem('token')) {
        return true;
    }

    return false;
}

export const isAdmin = () => {
    const user = decodeToken();
    return user.role.name === 'Admin';
}

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded;
}