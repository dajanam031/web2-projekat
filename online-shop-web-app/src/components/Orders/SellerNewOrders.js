import Home from "../Users/Home";
import { GetSellerOrders } from "../../services/OrderService";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import SellerDetails from "./SellerDetails";
import { OrdersInfo } from "../../models/OrdersInfo";

function SellerNewOrders(){
    const [orders, setOrders] = useState(new OrdersInfo());
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [remainingTimes, setRemainingTimes] = useState({});
    const [info, setInfo] = useState('');

    const getNewOrders = async () => {
        try {
          const resp = await GetSellerOrders(true);
          setOrders(resp);
        } catch (error) {
          setInfo(error.message);
        }
      
    };
    
      useEffect(() => {
        getNewOrders();
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

      useEffect(() => {
        const updateRemainingTimes = () => {
          if (orders.length > 0) {
            const updatedTimes = {};
            orders.forEach((order) => {
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
      }, [orders]);

    return (
        <>
        <Home/>
        {!orders && (<p>Loading...</p>)}
        {orders.length > 0 && (
            <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#b6c2b9' }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ borderBottom: '1px solid #050000' }}>
                    <h3>New orders</h3>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Purchaser</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Ordering time</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Estimated delivery time</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Comment</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Delivery address</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Total price (rsd)</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Status</b></TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}><b>Remaining delivery time</b></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {orders.map((order) => (
                <TableRow key={order.id} >
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          alt=""
                          src={`https://localhost:5001/${order.customerImage}`}
                          style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <span style={{ display: 'inline-block' }}>{order.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.orderingTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.deliveryTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.comment}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.deliveryAddress}</TableCell>
                    <TableCell align="right"sx={{ borderBottom: '1px solid #050000' }}>{order.totalPrice}</TableCell>
                    {order.status === 2 ? <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'red' }}>canceled</TableCell> :
                    order.isDelivered ? <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'green' }}>delivered</TableCell> :
                    <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'blue' }}>delivering...</TableCell>}
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>
                    <div>
                    {remainingTimes[order.id] && <span>{remainingTimes[order.id]}</span>}
                    </div>
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000', fontSize: '13px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="outlined" color="secondary" size="small"
                        onClick={() => handleOpenDialog(order.id)}>
                        Details
                        </Button>
                    </div>
                </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>
            <SellerDetails
        open={openDialog}
        handleClose={handleCloseDialog}
        orderId={selectedOrderId}
      />
            </>
        )}
        {info && <h3>{info}</h3>}
        </>
    );
}

export default SellerNewOrders;