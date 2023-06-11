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
import { GetSellerOrderDetails } from "../../services/OrderService";

function SellerDetails({ open, handleClose, orderId }) {
  const [details, setDetails] = useState(new OrderDetailsModel());
  const [errorMessage, setErrorMessage] = useState("");

  const getSellerOrderDetails = async (orderId) => {
    try {
      const resp = await GetSellerOrderDetails(orderId);
      setDetails(resp);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (open) {
        getSellerOrderDetails(orderId);
    }
  }, [open, orderId]);

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Items in order</DialogTitle>
    <DialogContent>
      {details && details.length > 0 ? (
        <List>
          {details.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={<>
                    <span>
                    <img
                          className="item-image"
                          alt=""
                          src={`https://localhost:5001/${item.imageUri}`}
                          style={{ width: '50px', height: '50px' }}
                        />
                    </span>
                    <br />
                    <span>Name: {item.name}</span>
                    </>}
                  secondary={
                    <>
                      <span>Description: {item.description}</span>
                      <br />
                      <span>Price: {item.price} rsd</span>
                      <br />
                      <span>Quantity: {item.itemQuantity}</span>
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

export default SellerDetails;
