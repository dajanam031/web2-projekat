import Home from "../Users/Home";
import { GetAllOrders } from "../../services/OrderService";
import { useEffect, useState } from "react";
import { OrdersInfo } from "../../models/OrdersInfo";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import OrderDetails from "./OrderDetails";

function AllOrders(){
    const [orders, setOrders] = useState(new OrdersInfo());
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const getAllOrders = async () => {
        try {
          const resp = await GetAllOrders();
          setOrders(resp);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      useEffect(() => {
        getAllOrders();
      }, []);

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
                    <TableCell colSpan={7} align="center" sx={{ borderBottom: '1px solid #050000' }}>
                    <h3>All orders</h3>
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
                </TableRow>
            </TableHead>

            <TableBody>
                {orders.map((order) => (
                <TableRow key={order.id} >
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.customer}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.orderingTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{formatDate(order.deliveryTime)}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.comment}</TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #050000' }}>{order.deliveryAddress}</TableCell>
                    <TableCell align="right"sx={{ borderBottom: '1px solid #050000' }}>{order.totalPrice}</TableCell>
                    {order.status === 2 ? <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'red' }}>canceled</TableCell> :
                    order.isDelivered ? <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'green' }}>delivered</TableCell> :
                    <TableCell align="right"sx={{ borderBottom: '1px solid #050000', color: 'blue' }}>delivering...</TableCell>}
                    
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
            <OrderDetails
        open={openDialog}
        handleClose={handleCloseDialog}
        orderId={selectedOrderId}
      />
            </>
        )}
        </>
    );
}

export default AllOrders;