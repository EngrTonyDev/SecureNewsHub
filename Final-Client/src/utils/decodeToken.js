import jwt_decode from "jwt-decode";

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      return decoded;
    }
    return null;
  }