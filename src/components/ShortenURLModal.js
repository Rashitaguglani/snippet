import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const ShortenURLModal = ({ handleClose, createShortenLink }) => {
    const [form, setForm] = useState({
        name: '',
        longUrl: '', 
    });
    
    const handleChange = (event) => {
        setForm((oldForm) => ({
            ...oldForm,
            [event.target.name]: event.target.value,
        }));
    };
    const handleSubmit = () => {
        createShortenLink(form.name, form.longUrl);
    };
    
    return (
        <Dialog open={true} onClose={handleClose} fullWidth> 
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    SNIP YOUR URL
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box mb={3}>
                    <TextField value={form.name} name="name" onChange={handleChange} fullWidth variant="filled" label="Name" />
                </Box>
                <TextField value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth variant="filled" label="Long URL" />
            </DialogContent>
            <DialogActions>
                <Box mr={2} my={1}>
                    <Button onClick={handleSubmit} color="secondary" variant="contained" disableElevation>SNIPPED</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ShortenURLModal;
