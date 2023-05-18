import axios from "axios";

export const RegisterUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };