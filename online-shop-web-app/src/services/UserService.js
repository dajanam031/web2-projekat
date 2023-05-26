import axios from "axios";

export const RegisterUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

export const LoginUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };