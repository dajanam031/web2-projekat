import Home from "../Users/Home";
import { CustomersOrders, CancelOrder } from "../../services/OrderService";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Snackbar } from "@mui/material";
import OrderDetails from "./OrderDetails";

function CustomerOrders() {
    const [allOrders, setAllOrders] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [remainingTimes, setRemainingTimes] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const getAllOrders = async () => {
        try {
          const resp = await CustomersOrders();
          setAllOrders(resp);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
    
      useEffect(() => {
        getAllOrders();
      }, []);

      const calculateRemainingTime = (deliveryTime) => {
        const currentTime = new Date();
        const targetTime = new Date(deliveryTime);
        const timeDifference = targetTime.getTime() - currentTime.getTime();
      
        if (timeDifference > 0) {
          const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const remainingMinutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const remainingSeconds = Math.floor((timeDifference / 1000) % 60);
          return `${remainingDays}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
        } else {
          return "Delivered!";
        }
      };
      

      useEffect(() => {
        const updateRemainingTimes = () => {
          if (allOrders) {
            const updatedTimes = {};
            allOrders.forEach((order) => {
              if (!order.isDelivered) {
                const remainingTime = calculateRemainingTime(order.deliveryTime);
                updatedTimes[order.id] = remainingTime;
              }
            });
            setRemainingTimes(updatedTimes);
          }
        };
    
        updateRemainingTimes();
    
        const timer = setInterval(() => {
          updateRemainingTimes();
        }, 1000);
    
        return () => {
          clearInterval(timer);
        };
      }, [allOrders]);

      const formatDate = (date) => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString();
        return formattedDateTime;
      }

      const handleOpenDialog = (orderId) => {
        setSelectedOrderId(orderId);
        setOpenDialog(true);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

      const handleCancel = async (orderId) => {
        try {
          const resp = await CancelOrder(orderId);
          const filtered = allOrders.filter((order) => order.id !== +orderId);
          setAllOrders(filtered);
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
        {allOrders && (
            <>
            {allOrders.filter((order) => !order.isDelivered).length > 0 && (

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#bef2bd' }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ borderBottom: '1px solid #050000' }}>
                    <h3>Orders in progress</h3>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Order time</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Estimated delivery time</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Comment</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Delivery address</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Total price (rsd)</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Remaining delivery time</b></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {allOrders.filter((order) => !order.isDelivered).map((order) => (
                <TableRow key={order.id} >
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.orderingTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.deliveryTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.comment}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.deliveryAddress}</TableCell>
                    <TableCell align="right"sx={{ borderBottom: '1px solid #050000' }}>{order.totalPrice}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>
                    <div>
                    {remainingTimes[order.id] && <span>{remainingTimes[order.id]}</span>}
                    </div>
                    </TableCell>
                    <TableCell align="right">
                <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="outlined" color="secondary" size="small" onClick={() => handleOpenDialog(order.id)}>
                        Details
                        </Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => handleCancel(order.id)}>
                            Cancel order
                        </Button>
                    </div>
                </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>
        )}

        {allOrders.filter((order) => order.isDelivered).length > 0 && (
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, backgroundColor: '#ecc0ed'}} size="small" aria-label="a dense table">
                  <TableHead>
                      <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ borderBottom: '1px solid #050000' }}>
                          <h3>Delivered Orders</h3>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Order time</b></TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Delivery time</b></TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Comment</b></TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Delivery address</b></TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Total price</b></TableCell>
                      </TableRow>
                  </TableHead>
      
                  <TableBody>
                    {allOrders.filter((order) => order.isDelivered).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.orderingTime)}</TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.deliveryTime)}</TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.comment}</TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.deliveryAddress}</TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.totalPrice}</TableCell>
                          <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>
                          <div style={{ display: 'flex', justifyContent: 'center'}}>
                              <Button variant="outlined" color="secondary" size="small" onClick={() => handleOpenDialog(order.id)}>
                              Details
                              </Button>
                          </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
        {errorMessage && <h3>{errorMessage}</h3>}
        <OrderDetails
        open={openDialog}
        handleClose={handleCloseDialog}
        orderId={selectedOrderId}
      />
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

export default CustomerOrders;