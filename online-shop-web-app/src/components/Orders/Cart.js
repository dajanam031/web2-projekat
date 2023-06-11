import React from "react";
import { useEffect, useState, useRef } from "react";
import { GetCurrentOrder, DeleteOrderItem, DeclineOrder, ConfirmOrder } from "../../services/OrderService";
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
  TextField,
  Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from '@mui/material/Snackbar';
import Home from "../Users/Home";
import { OrderToConfirm } from "../../models/OrderToConfirm";

function Cart() {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderToConfirm, setOrderToConfirm] = useState(new OrderToConfirm());
  const [emptyFieldsMess, setEmptyFieldsMess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const commentRef = useRef(null);
  const deliveryAddressRef = useRef(null);

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

  const handleDelete = async (rowKey, price) => {
    try {
      const [orderId, itemId] = rowKey.split('-');
      await DeleteOrderItem(itemId, orderId);
      getOrder();
    } catch (error) {
      setOrder(null);
      setErrorMessage(error.message);
    }
  };

  const handleDecline = async (orderId) => {
    try {
        await DeclineOrder(orderId);
        setOrder(null);
      } catch (error) {
        setErrorMessage(error.message);
      }
  };

  const handleSubmit = async (orderId) => {
    if(orderToConfirm.comment.trim() === '' && orderToConfirm.deliveryAddress.trim() === ''){
        setEmptyFieldsMess("Please fill out comment and delivery address before confirming order.");
        commentRef.current.focus();
        return;
    }
    if(orderToConfirm.comment.trim() === ''){
      setEmptyFieldsMess("Please fill out comment before confirming order.");
      commentRef.current.focus();
      return;
    }
    if(orderToConfirm.deliveryAddress.trim() === ''){
      setEmptyFieldsMess("Please fill out delivery address before confirming order.");
      deliveryAddressRef.current.focus();
      return;
    }
    setEmptyFieldsMess('');

    try {
      const resp = await ConfirmOrder(orderId, orderToConfirm);
      setOrder(null);
      const dateTime = new Date(resp.deliveryTime);
      const formattedDateTime = dateTime.toLocaleString();
      setSnackbarMessage('Order is successfully confirmed. Estimated delivery time: ' + formattedDateTime);
      setSnackbarOpen(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <Home />
      {order !== null && errorMessage === '' && (
        <Box maxWidth={600} margin="auto">
          <Box
            component={Paper}
            sx={{ backgroundColor: "#a6ad93" }}
            marginTop={2}
            padding={2}
          ><div>{emptyFieldsMess && <Alert variant="outlined" severity="error">{emptyFieldsMess}</Alert>}</div>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"><b>Quantity</b></TableCell>
                    <TableCell align="right"><b>Total item price</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.map((orderItem) => {
                    const rowKey = `${orderItem.orderId}-${orderItem.itemId}`;
                    return (
                      <TableRow key={rowKey}>
                        <TableCell>
                        <img
                          className="item-image"
                          alt=""
                          src={`https://localhost:5001/${orderItem.itemImage}`}
                          style={{ width: '50px', height: '50px' }}
                        />
                          </TableCell>
                        <TableCell>{orderItem.itemName}</TableCell>
                        <TableCell align="right">
                          {orderItem.itemQuantity}
                        </TableCell>
                        <TableCell align="right">
                          {orderItem.itemPrice} rsd
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="#a6ad93"
                            size="small"
                            onClick={() => handleDelete(rowKey, orderItem.itemPrice)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Price:</b>
                    </TableCell>
                    <TableCell align="right">{order[0].totalPrice} rsd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Delivery fee:</b>
                    </TableCell>
                    <TableCell align="right">{order[0].fee} rsd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Total price:</b>
                    </TableCell>
                    <TableCell align="right">{order[0].totalPrice + order[0].fee} rsd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
              <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                mt={2}
              >
                <TextField
                  label="Comment"
                  value={orderToConfirm.comment}
                  onChange={(e) => setOrderToConfirm((prevData) => ({ ...prevData, comment: e.target.value }))}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                  margin="dense"
                  inputRef={commentRef}
                />
                <TextField
                  label="Delivery Address"
                  value={orderToConfirm.deliveryAddress}
                  onChange={(e) => setOrderToConfirm((prevData) => ({ ...prevData, deliveryAddress: e.target.value }))}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  inputRef={deliveryAddressRef}
                />
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button onClick={() => handleDecline(order[0].orderId)} variant="contained" color="error">
                    Decline Order
                  </Button>
                  <Button onClick={() => handleSubmit(order[0].orderId)} variant="contained" color="primary">
                    Confirm Order
                  </Button>
                </Box>
              </Box>
              </form>
            </TableContainer>
          </Box>
        </Box>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      <Snackbar
      open={snackbarOpen}
      autoHideDuration={7000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      message={snackbarMessage}
    />
    </>
  );
}

export default Cart;
