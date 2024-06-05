import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});
const  baseURL="http://localhost:3000";
export const getItems = () => api.get("/getitems", { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
export const addItemData = (item) => api.post("/additem", { data: item }, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
export const deleteItemData = (id) => api.delete(`/deleteitem/${id}`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
export const checkItem = (id) => api.put(`/updateitem/${id}`, {}, { withCredentials: true, headers: { 'Content-Type': 'application/json', } });
export const getUserData = () => api.get("/getdata", { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
export const BASE_URL=baseURL;