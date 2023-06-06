import React from "react";
import { useEffect, useState } from "react";
import { GetCurrentOrder } from "../../services/OrderService";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Box,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Home from "../Users/Home";

function Cart() {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [comment, setComment] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const getOrder = async () => {
    try {
      const resp = await GetCurrentOrder();
      setOrder(resp);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  return (
    <>
      <Home />
      {order && (
        <Box maxWidth={600} margin="auto">
          <Box
            component={Paper}
            sx={{ backgroundColor: "#a6ad93" }}
            marginTop={2}
            padding={2}
          >
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell align="right"><b>Quantity</b></TableCell>
                    <TableCell align="right"><b>Price</b></TableCell>
                    <TableCell align="right"><b>Seller's delivery fee</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.map((orderItem) => {
                    const rowKey = `${orderItem.orderId}-${orderItem.itemId}`;
                    console.log(rowKey);
                    return (
                      <TableRow key={rowKey}>
                        <TableCell>{orderItem.itemName}</TableCell>
                        <TableCell align="right">
                          {orderItem.itemQuantity}
                        </TableCell>
                        <TableCell align="right">
                          {orderItem.itemPrice} rsd
                        </TableCell>
                        <TableCell align="right">
                          {200} rsd
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="#a6ad93"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Total delivery fee:</b>
                    </TableCell>
                    <TableCell align="right">{400} rsd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Total Sum:</b>
                    </TableCell>
                    <TableCell align="right">{5000} rsd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                mt={2}
              >
                <TextField
                  label="Comment"
                  value={comment}
                  onChange={handleCommentChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                  margin="dense"
                />
                <TextField
                  label="Delivery Address"
                  value={deliveryAddress}
                  onChange={handleDeliveryAddressChange}
                  variant="outlined"
                  size="small"
                  margin="dense"
                />
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button variant="contained" color="error">
                    Decline Order
                  </Button>
                  <Button variant="contained" color="primary">
                    Confirm Order
                  </Button>
                </Box>
              </Box>
            </TableContainer>
          </Box>
        </Box>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default Cart;
