import axios from "axios";


export const RegisterUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const RegisterUserWithGoogle = async (googleToken) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/google-signin`, googleToken);
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

  export const UserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const ChangeUserProfile = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/update-profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const ChangeUserPassword = async (newPass) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/change-password`, newPass, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const GetSellers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/sellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  export const VerifySeller = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/verify`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: id
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };


  export const DeclineSeller = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/decline`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: id
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };



