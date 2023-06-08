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
import Home from "../Users/Home";
import { OrderToConfirm } from "../../models/OrderToConfirm";

function Cart() {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderToConfirm, setOrderToConfirm] = useState(new OrderToConfirm());
  const [emptyFieldsMess, setEmptyFieldsMess] = useState("");
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

  const handleDelete = async (rowKey) => {
    try {
      const [orderId, itemId] = rowKey.split('-');
      await DeleteOrderItem(itemId, orderId);
      getOrder();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDecline = async (orderId) => {
    try {
        await DeclineOrder(orderId);
        setOrder(null);
        getOrder();
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
      setErrorMessage(resp);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

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
          ><div>{emptyFieldsMess && <Alert variant="outlined" severity="error">{emptyFieldsMess}</Alert>}</div>
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
                            onClick={() => handleDelete(rowKey)}
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
                    <TableCell align="right">{order[0].totalPrice + 400} rsd</TableCell>
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
    </>
  );
}

export default Cart;
