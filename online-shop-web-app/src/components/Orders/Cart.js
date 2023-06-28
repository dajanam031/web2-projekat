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
  Alert,
  Checkbox,
  Typography,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from '@mui/material/Snackbar';
import Home from "../Users/Home";
import { OrderToConfirm } from "../../models/OrderToConfirm";
import PayPalButton from "./PayPalButton";

function Cart() {
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderToConfirm, setOrderToConfirm] = useState(new OrderToConfirm());
  const [emptyFieldsMess, setEmptyFieldsMess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const commentRef = useRef(null);
  const countryRef = useRef(null);
  const cityRef = useRef(null);
  const streetRef = useRef(null);
  const postalCodeRef = useRef(null);

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
    
    if(orderToConfirm.comment.trim() === ''){
      setEmptyFieldsMess("Please fill out comment before confirming order.");
      commentRef.current.focus();
      return;
    }
    if(country.trim() === ''){
      setEmptyFieldsMess("Please fill out country before confirming order.");
      countryRef.current.focus();
      return;
    }
    if(city.trim() === ''){
      setEmptyFieldsMess("Please fill out city before confirming order.");
      cityRef.current.focus();
      return;
    }
    if(street.trim() === ''){
      setEmptyFieldsMess("Please fill out street before confirming order.");
      streetRef.current.focus();
      return;
    }
    if(postalCode.trim() === ''){
      setEmptyFieldsMess("Please fill out postal code before confirming order.");
      postalCodeRef.current.focus();
      return;
    }

    if(!isChecked && !isPaymentSuccess){
      // nije odabrano placanje
      setEmptyFieldsMess("Please select payment method. You can pay on delivery or using paypal.");
      return;
    }
    setEmptyFieldsMess('');

    try {
      if(isChecked){
        orderToConfirm.paymentType = 'OnDelivery';
      }
      else if(isPaymentSuccess){
        orderToConfirm.paymentType = 'Paypal';
      }else{
        orderToConfirm.paymentType = 'None';
      }
      
      console.log(orderToConfirm);
      const resp = await ConfirmOrder(orderId, orderToConfirm);
      setOrder(null);
      setSnackbarMessage(resp);
      setSnackbarOpen(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handlePaymentSuccess = () => {
    setIsPaymentSuccess(true);
    setEmptyFieldsMess('');
  };
  

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
                          {orderItem.itemPrice} usd
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
                    <TableCell align="right">{order[0].totalPrice} usd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Delivery fee:</b>
                    </TableCell>
                    <TableCell align="right">{order[0].fee} usd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2.5} align="right">
                      <b>Total price:</b>
                    </TableCell>
                    <TableCell align="right">{order[0].totalPrice + order[0].fee} usd</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
              <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" mt={2}>
              <Box display="flex" flexDirection="column">
              <TextField
                    label="Comment"
                    value={orderToConfirm.comment}
                    onChange={(e) => setOrderToConfirm((prevData) => ({ ...prevData, comment: e.target.value }))}
                    variant="outlined"
                    size="small"
                    multiline
                    margin="dense"
                    inputRef={commentRef}
                  />
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setOrderToConfirm((prevData) => ({
                          ...prevData,
                          deliveryAddress: `${street}, ${city}, ${postalCode}, ${e.target.value}`
                        }));
                      }}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      inputRef={countryRef}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setOrderToConfirm((prevData) => ({
                          ...prevData,
                          deliveryAddress: `${street}, ${e.target.value}, ${postalCode}, ${country}`
                        }));
                      }}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      inputRef={cityRef}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Street"
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                        setOrderToConfirm((prevData) => ({
                          ...prevData,
                          deliveryAddress: `${e.target.value}, ${city}, ${postalCode}, ${country}`
                        }));
                      }}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      inputRef={streetRef}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Postal Code"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                        setOrderToConfirm((prevData) => ({
                          ...prevData,
                          deliveryAddress: `${street}, ${city}, ${e.target.value}, ${country}`
                        }));
                      }}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      inputRef={postalCodeRef}
                    />
                  </Grid>
                  </Grid>

                  </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                  <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} disabled={isPaymentSuccess}/>
                  <Typography>Pay on delivery</Typography>
                  <Box display="flex" alignItems="center" marginLeft={4}>
                    <Typography variant="body2">or</Typography>
                    <Box marginLeft={7}>
                      <PayPalButton totalPrice={order[0].totalPrice + order[0].fee}
                       disabled={isChecked}
                       onPaymentSuccess={handlePaymentSuccess} />
                    </Box>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Button onClick={() => handleDecline(order[0].orderId)} disabled={isPaymentSuccess} variant="contained" color="error">
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
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      message={snackbarMessage}
    />
    </>
  );
}

export default Cart;
