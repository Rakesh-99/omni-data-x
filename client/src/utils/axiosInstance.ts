import axios from 'axios';



export const axiosTeacherInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 8000,
    withCredentials: true
});