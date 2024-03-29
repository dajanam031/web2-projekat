import { useState, useEffect } from "react";
import { Card, CardContent, Typography, CardActions, Button, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@mui/material';
import '../../styles/ItemList.css';
import Home from "../Users/Home";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { GetSellerItems, DeleteItem, ModifyItem } from "../../services/ItemService";
import { Item } from "../../models/Item";
import AddArticle from "./AddArticle";



function SellerArticles() {
    const [items, setItems] = useState(null);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [updatedItem, setUpdatedItem] = useState(new Item());
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
      setIsEmpty(items && items.length === 0);
    }, [items]);

    const getItems = async () => {
        try {
          const resp = await GetSellerItems();
          setItems(resp);
        } catch (error) {
          setErrorMessage(error.message);
        }
      
    };
    
      useEffect(() => {
        getItems();
      }, []);

      const handleDelete = async (id) => {
        try {
            await DeleteItem(id);
            const updatedItems = items.filter((item) => item.id !== id);
            setItems(updatedItems);
          } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarOpen(true);
          }
      }

      const handleOpen = (item) => {
        setUpdatedItem(item);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setErrorMessage('');
      };

      const handleEdit = async () => {
        if (!validateForm(updatedItem)) {
          return;
        }

        const formData = new FormData();
        formData.append("id", updatedItem.id);
        formData.append("name", updatedItem.name);
        formData.append("description", updatedItem.description);
        formData.append("quantity", updatedItem.quantity);
        formData.append("price", updatedItem.price);
        formData.append("imageUri", selectedImage);

        try {
            const resp = await ModifyItem(formData);
            const itemIndex = items.findIndex((item) => item.id === updatedItem.id);
            if (itemIndex !== -1) {
                const modified = [...items];
                modified[itemIndex] = resp; 
                setItems(modified); 
              }
              handleClose();
          } catch (error) {
            setErrorMessage(error.message);
          }
      };


    const handleAddClick = () => {
        setIsAddOpen(true);
    };

    const handleAddItem = (newItem) => {
      setItems((prevItems) => {
        if (!prevItems || !Array.isArray(prevItems)) {
          setErrorMessage('');
          return [newItem]; // ako nije bilo artikala u listi
        }
        setErrorMessage('');
        return [...prevItems, newItem]; 
      });
      };

      function validateForm(updatedItem){

        const trimmedFields = ['name', 'description'];
        const hasEmptyRequiredFields = trimmedFields.some((field) => updatedItem[field].trim() === '');
    
        if (hasEmptyRequiredFields) {
          setErrorMessage("Please fill in all required fields.");
          return false;
        }
        return true;
      }

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };

    return(
        <>
        <Home/>
          <IconButton onClick={handleAddClick} style={{ color: 'black', fontSize: '20px' }}>
            <AddCircleOutlineRoundedIcon />
            Add new article
          </IconButton>
          {isAddOpen && <AddArticle onClose={() => setIsAddOpen(false)} onAddItem={handleAddItem} />}
        {items && (
            <>
            <div className="item-list">
          {items.map((item) => (
            <Card key={item.id} className="item-card">
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
              <img className="item-image" alt="" src={`https://localhost:5001/${item.imageUri}`} />
                
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price} rsd
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpen(item)}  endIcon={<EditIcon/>} variant="outlined" size="small">Modify</Button>
                <Button onClick={() => handleDelete(item.id)} endIcon={<DeleteIcon/>} variant="outlined" size="small">Delete</Button>
                <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modify article</DialogTitle>
            <DialogContent>
            {errorMessage && (
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              )}
              <form onSubmit={handleEdit}>
                <TextField label="Name" required
                variant='filled' value={updatedItem.name} onChange={(e) => setUpdatedItem((prevItem) => ({ ...prevItem, name: e.target.value }))}
                />
                <br/>
                <TextField label="Description" required
                variant='filled' value={updatedItem.description} onChange={(e) => setUpdatedItem((prevItem) => ({ ...prevItem, description: e.target.value }))}
                /><br/>
                <TextField label="Quantity"
                variant='filled' type="number" required value={updatedItem.quantity}
                onChange={(e) => setUpdatedItem((prevItem) => ({ ...prevItem, quantity: e.target.value }))}
                inputProps={{
                  min: 0,
                }}
                /><br/>
                <TextField label="Price" required  type="number" sx={{ width: "300px" }}
                variant='filled' value={updatedItem.price}
                onChange={(e) => setUpdatedItem((prevItem) => ({ ...prevItem, price: e.target.value }))}
                inputProps={{
                  min: 0,
                }}
                /><br/>
                 <TextField
              variant="filled"
                helperText="Change image"
                sx={{ width: "400px" }}
                type="file"
                InputProps={{
                  inputProps: {
                    accept: 'image/*',
                  }}}
                onChange={handleFileChange}
              />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEdit} type='submit' color="primary" variant="contained">
                Change
              </Button>
            </DialogActions>
          </Dialog>
              </CardActions>
            </Card>
          ))}
        </div>
            </>
        )}
    {!items && (
        <><h1>{errorMessage}</h1></>
    )}
    {isEmpty && (
      <h1>You don't have any articles yet.</h1>
    )}
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

export default SellerArticles;