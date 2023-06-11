import React from "react";
import { useEffect, useState } from "react";
import { GetSellers } from "../../services/UserService";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Home from "./Home";
import { VerifySeller, DeclineSeller } from "../../services/UserService";

function Verification() {
  const [sellers, setSellers] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [totalRows, setTotalRows] = useState(0);

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

  const verification = async () => {
      try {
        const resp = await GetSellers(page, rowsPerPage);
        setSellers(resp.data);
        setTotalRows(resp.totalRows);
      } catch (error) {
        console.log(error.message);
      }
 };
  useEffect(() => {
      verification();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page, rowsPerPage]);

  const handleAccept = async (id) => {
    try{
      console.log(id);
        await VerifySeller(id);
        console.log(id);
        // nije bilo errora pa cu samo izmeniti prikaz podataka, necu fecovati listu svih opet
        const updatedSellers = sellers.map((seller) =>
        seller.id === id ? { ...seller, verified: true, verificationStatus: true } : seller);
        setSellers(updatedSellers);
    }catch (error) {
        console.log(error.message);
    } 
 }

  const handleDecline = async (id) => {
    try{
      await DeclineSeller(id);
      const updatedSellers = sellers.filter((seller) => seller.id !== id);
      setSellers(updatedSellers);
    }catch (error) {
      console.log(error.message);
    } 
 }

 const getType = (type) => {
    if( type === 0){
      return 'Customer';
    }else{
      return 'Seller';
    }
 }

 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 3));
  setPage(0);
};
    return (
        <>
        <Home/>
        {!sellers && (<h1>No sellers yet.</h1>)}
        {sellers && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell></StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">Role</StyledTableCell>
                  <StyledTableCell align="right">Firstname</StyledTableCell>
                  <StyledTableCell align="right">Lastname&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Username&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Verified&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Status&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellers.map((seller) => (
                  <StyledTableRow key={seller.email}>
                    <TableCell align="right">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          alt=""
                          src={`https://localhost:5001/${seller.imageUri}`}
                          style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                      </div>
                    </TableCell>
                    <StyledTableCell component="th" scope="row">
                      {seller.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">{getType(seller.userType)}</StyledTableCell>
                    <StyledTableCell align="right">{seller.firstName}</StyledTableCell>
                    <StyledTableCell align="right">{seller.lastName}</StyledTableCell>
                    <StyledTableCell align="right">{seller.username}</StyledTableCell>
                    <StyledTableCell align="right">{seller.verified ? "verified" : "unverified"}</StyledTableCell>
                    <StyledTableCell align="right">{seller.verificationStatus ? "finished" : "pending"}</StyledTableCell>
                    {!seller.verified && !seller.verificationStatus && (
                      <div>
                      <Button
                         endIcon={<CheckRoundedIcon />}
                         onClick={() => handleAccept(seller.id)}
                        variant="outlined"
                        color="success"
                        >
                        Accept
                    </Button>
                   <Button
                        endIcon={<CloseRoundedIcon />}
                        onClick={() => handleDecline(seller.id)}
                        variant="outlined"
                        color="error"
                        >
                        Decline
                    </Button>
                      </div>
                      
                    )}
                    
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[3, 5, 10, 15]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </TableContainer>
          
        )}
        </>
    );
}

export default Verification;