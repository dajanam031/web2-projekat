import Home from "../Users/Home";
import { useState, useEffect } from "react";
import { GetAllItems } from "../../services/ItemService";
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { AddItemToCart } from "../../services/OrderService";
import Snackbar from '@mui/material/Snackbar';

function AllArticles(){
    const [items, setItems] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [itemQuantities, setItemQuantities] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const getAllItems = async () => {
        try {
          const resp = await GetAllItems();
          setItems(resp);
        } catch (error) {
          setErrorMessage(error.message);
        }
    };
    
      useEffect(() => {
        getAllItems();
      }, []);

      
  const handleIncreaseQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    });
  };

  const handleDecreaseQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0),
    }));
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  };

  const handleAddToCart = async (itemId) => {
    const quantity = itemQuantities[itemId] || 0;
    
    try {
      const resp = await AddItemToCart(itemId, quantity);
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: 0, 
      }));
      setSnackbarMessage(resp);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };


    return (
        <>
        <Home/>
        {items && (
            <>
            <div className="item-list">
          {items.map((item) => (
            <Card key={item.id} className="item-card">
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
              <img className="item-image" alt="" src={`https://localhost:5001/${item.imageUri}`} />
                
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price} usd
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available quantity: {item.quantity}
                </Typography>
              </CardContent>
              <CardActions>
              <Button variant="outlined" disabled={!itemQuantities[item.id] || itemQuantities[item.id] === 0} size="small" onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                        {itemQuantities[item.id] || 0}
                    </Typography>
                    <Button disabled={item.quantity === 0} 
                    variant="outlined" size="small" onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                    </Button>
                <Button  variant="outlined"  size="small" onClick={() => handleAddToCart(item.id)}>Add to cart</Button>
              </CardActions>
            </Card>
          ))}
        </div>
            </>
        )}
        <Snackbar
      open={snackbarOpen}
      autoHideDuration={7000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={snackbarMessage}
    />
    {!items && (
        <><h1>{errorMessage}</h1></>
    )}
        </>
    );
}

export default AllArticles;