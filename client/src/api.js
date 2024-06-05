import axios from "axios";

const api = axios.create({
    baseURL: "https://todoappapi-2m4x.onrender.com",
});
const  baseURL="https://todoappapi-2m4x.onrender.com";
export const getItems = () => api.get("/getitems", { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
export const addItemData = (item) => api.post("/additem", { data: item }, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
export const deleteItemData = (id) => api.delete(`/deleteitem/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
export const checkItem = (id) => api.put(`/updateitem/${id}`, {}, { withCredentials: true, headers: { 'Content-Type': 'application/json', } });
export const getUserData = () => api.get("/getdata", { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
export const BASE_URL=baseURL;