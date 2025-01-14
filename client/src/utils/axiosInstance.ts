import axios from 'axios';

export const axiosTeacherInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000", // Default to local if not set
    withCredentials: true, // Important for allowing credentials to be sent
});
