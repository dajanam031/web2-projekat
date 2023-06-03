import axios from "axios";

export const GetSellerItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/items/seller-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const DeleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const ModifyItem = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/items/update-item`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const AddItem = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/items`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };