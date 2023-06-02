import React from "react";
import { useEffect, useState } from "react";
import { GetSellers } from "../services/UserService";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Home from "./Home";
import { VerifySeller } from "../services/UserService";

function Verification() {
    const [sellers, setSellers] = useState(null);
    const [selectedSellerId, setSelectedSellerId] = useState(null);

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
          const resp = await GetSellers();
          setSellers(resp);
        } catch (error) {
          console.log(error.message);
        }
      
    };
useEffect(() => {
        verification();
      }, []);

const handleAccept = async (id) => {
        try{

            const resp = await VerifySeller(id);
            console.log(resp);
            verification(); // Fetch the updated list of sellers
        }catch (error) {
            console.log(error.message);
          }
      
    
}

const handleDecline = () => {
    
}
    return (
        <>
        <Home/>
        {!sellers && (<h1>Loading...</h1>)}
        {sellers && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">Firstname</StyledTableCell>
                  <StyledTableCell align="right">Lastname&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Username&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Verified&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sellers.map((seller) => (
                  <StyledTableRow key={seller.email}>
                    <StyledTableCell component="th" scope="row">
                      {seller.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">{seller.firstName}</StyledTableCell>
                    <StyledTableCell align="right">{seller.lastName}</StyledTableCell>
                    <StyledTableCell align="right">{seller.username}</StyledTableCell>
                    <StyledTableCell align="right">{seller.verified ? "verified" : "unverified"}</StyledTableCell>
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
                        onClick={handleDecline}
                        variant="outlined"
                        color="error"
                        >
                        Decline
                    </Button>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        </>
    );
}

export default Verification;