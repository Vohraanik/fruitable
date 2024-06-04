import React, { useContext, useEffect, useState } from 'react';
import { contactContext } from '../../context/contactContext';
import { useFormik } from 'formik';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { object, string, number, date, InferType } from 'yup';

function Contact(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const contact = useContext(contactContext);
    console.log(contact);

    useEffect(() => {
   
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    };

    let contactSchema = object({
        address: string().required(),
        email: string().email().required(),
        number: number().required().positive().integer(),
    });

    const formik = useFormik({
        initialValues: {
            address: '',
            email: '',
            number: '',
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                // Handle update
            } else {
                contact.addContact(values);
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    return (
        <div style={{ textAlign: 'end', marginRight: '20px', marginTop: '20px' }}>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Contact
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Contact</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
                                label="Address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                error={touched.address && Boolean(errors.address)}
                                helperText={touched.address && errors.address}
                            />
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                margin="dense"
                                id="number"
                                name="number"
                                label="Number"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.number}
                                error={touched.number && Boolean(errors.number)}
                                helperText={touched.number && errors.number}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default Contact;
