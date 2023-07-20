import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/Products`);
export const getProductById = (id) => axios.get(`/api/Products/${id}`);