import axios from 'axios';

const BACKEND_ORIGIN_URL = 'http://localhost:3000';


const Login = async (email, password) => {
    try {
        const response = await axios.post(`/user/login`, { email, password });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

const Register = async (name, email, mobile, password) => {
    try {
        const response = await axios.post(`/user/register`, { name, email, mobile, password });
        console.log(response.data);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export { Login, Register };