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

  export const UserProfile = async (email) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile/${email}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const ChangeUserProfile = async (userData) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/update-profile/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };



