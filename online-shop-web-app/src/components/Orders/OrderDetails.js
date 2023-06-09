import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { OrderDetailsModel } from "../../models/OrderDetailsModel";
import { GetOrderDetails } from "../../services/OrderService";

function OrderDetails({ open, handleClose, orderId }) {
  const [details, setDetails] = useState(new OrderDetailsModel());
  const [errorMessage, setErrorMessage] = useState("");

  const getOrderDetails = async (orderId) => {
    try {
      const resp = await GetOrderDetails(orderId);
      setDetails(resp);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (open) {
      getOrderDetails(orderId);
    }
  }, [open, orderId]);

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Items in order</DialogTitle>
    <DialogContent>
      {details && details.length > 0 ? (
        <List>
          {details.map((item, index) => (
            <React.Fragment key={item.itemId}>
              <ListItem>
                <ListItemText
                  primary={item.itemName}
                  secondary={
                    <>
                      <span>Description: {item.itemDescription}</span>
                      <br />
                      <span>Price: {item.itemPrice} rsd</span>
                      <br />
                      <span>Quantity: {item.itemQuantity}</span>
                      <br />
                      <span>Seller name: {item.sellerName}</span>
                    </>
                  }
                />
              </ListItem>
              {index !== details.length - 1 && <Divider sx={{ height: 2, backgroundColor: 'black', margin: '10px 0' }}/>}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <p>No items found</p>
      )}
      {errorMessage && <h3>{errorMessage}</h3>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default OrderDetails;
