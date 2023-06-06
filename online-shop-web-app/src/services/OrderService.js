import axios from "axios";

export const AddItemToCart = async (itemId, quantity) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders/add-to-cart/${itemId}/${quantity}`, null, 
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

export const GetCurrentOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/order-view`, 
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