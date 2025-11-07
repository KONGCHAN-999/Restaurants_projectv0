import axios from "axios";
const API_URL_MENU = "http://localhost:5000/api/menu-items";
const API_URL_CATEGORY = "http://localhost:5000/api/menu-items";
const API_URL_STAFF = "http://localhost:5000/api/menu-items";
export const API_URL_IMAGE_MENU = "http://localhost:5000/Uploads";
// api munu
export const getMunu = () => axios.get(API_URL_MENU);
export const getMenuById = (id: string) => axios.get(`${API_URL_MENU}/${id}`);
export const createMenu = (data: FormData) =>
  axios.post(API_URL_MENU, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateMenu = (id: string, data: FormData) =>
  axios.put(`${API_URL_MENU}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });  
export const deleteMenu = (id: string) => axios.delete(`${API_URL_MENU}/${id}`);
// api category
export const getCategory = () => axios.get(API_URL_CATEGORY);
//staff
export const getStaff = () => axios.get(API_URL_STAFF);
export const getStaffById = (id: string) => axios.get(`${API_URL_STAFF}/${id}`);
export const createStaff = (data: FormData) =>
  axios.post(API_URL_STAFF, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });   
export const updateStaff = (id: string, data: FormData) =>
  axios.put(`${API_URL_STAFF}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });   
export const deleteStaff = (id: string) => axios.delete(`${API_URL_STAFF}/${id}`);