import {Typography,Button,Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { ItemToAdd } from '../../models/ItemToAdd';
import { useState } from 'react';
import { AddItem } from '../../services/ItemService';

function AddArticle({ onClose, onAddItem }){
    const [newItem, setNewItem] = useState(new ItemToAdd());
    const [errorMessage, setErrorMessage] = useState(false);
    const [open, setOpen] = useState(true);

      const handleClose = () => {
        setOpen(false);
        onClose();
      };

     
      const handleAdd = async () => {
        // validate
        try {
            await AddItem(newItem);
            onAddItem(newItem);
          } catch (error) {
            console.log(error.message);
          }
        setNewItem(new ItemToAdd());
        handleClose();
      };

    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add article</DialogTitle>
        <DialogContent>
        {errorMessage && (
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleAdd}>
            <TextField label="Name"
            variant='filled' value={newItem.name} onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, name: e.target.value }))}
            />
            <br/>
            <TextField label="Description"
            variant='filled' value={newItem.description} onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, description: e.target.value }))}
            /><br/>
            <TextField label="Quantity" type='number'
            variant='filled' value={newItem.quantity} onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, quantity: e.target.value }))}
            /><br/>
            <TextField label="Price" sx={{ width: "300px" }} type='number'
            variant='filled' value={newItem.price} onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, price: e.target.value }))}
            /><br/>
             <TextField label="Image"
            variant='filled' value={newItem.imageUri} onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, imageUri: e.target.value }))}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} type='submit' color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>);
}

export default AddArticle;