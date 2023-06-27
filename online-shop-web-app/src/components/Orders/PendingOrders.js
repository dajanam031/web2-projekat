import Home from "../Users/Home";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetPendingOrders } from "../../services/OrderService";

function PendingOrders(){
    const [allOrders, setAllOrders] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const getPendingOrders = async () => {
        try {
          const resp = await GetPendingOrders();
          setAllOrders(resp);
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
    
      useEffect(() => {
        getPendingOrders();
      }, []);

      const formatDate = (date) => {
        const dateTime = new Date(date);
        const formattedDateTime = dateTime.toLocaleString();
        return formattedDateTime;
      }

      const getType = (type) => {
        if(type === 0){
            return 'None';
        }
        if(type === 1){
            return 'PayPal';
        }
        if(type === 2){
            return 'On Delivery';
        }
      }

    return (
        <>
        <Home/>
        {allOrders &&
            <TableContainer component={Paper}>
            <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell><b>Order time</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Comment</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Delivery address</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Total price (usd)</b></StyledTableCell>
                    <StyledTableCell align="right"><b>Payment type</b></StyledTableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {allOrders.map((order) => (
                <StyledTableRow  key={order.id} >
                    <StyledTableCell>{formatDate(order.orderingTime)}</StyledTableCell >
                    <StyledTableCell  align="right">{order.comment}</StyledTableCell >
                    <StyledTableCell  align="right">{order.deliveryAddress}</StyledTableCell >
                    <StyledTableCell  align="right">{order.totalPrice}</StyledTableCell >
                    <StyledTableCell  align="right">{getType(order.paymentType)}</StyledTableCell >
                </StyledTableRow >
                ))}
            </TableBody>
            </Table>
            </TableContainer>
        }
        {errorMessage && <h3>{errorMessage}</h3>}
        </>
        );
}

export default PendingOrders;