import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, date, number } from 'yup';

function Copuns(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const copunsSchema = object({
        copuns: string().required('Copuns Code is required'),
        per: number().required('Percentage is required'),
        expDate: date().required('Expiry Date is required'),
    });

    const formik = useFormik({
        initialValues: {
            copuns: '',
            per: '',
            expDate: '',
            createAt: new Date().toISOString(), 
        },
        validationSchema: copunsSchema,
        onSubmit: (values, { resetForm }) => {
            
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your details here.
                    </DialogContentText>
                    <TextField
               
                        required
                        margin="dense"
                        id="copuns"
                        name="copuns"
                        label="Copuns Code"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={values.copuns}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.copuns && !!errors.copuns}
                        helperText={touched.copuns && errors.copuns}
                    />
                    <TextField
       
                        required
                        margin="dense"
                        id="per"
                        name="per"
                        label="Percentage"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={values.per}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.per && !!errors.per}
                        helperText={touched.per && errors.per}
                    />
                    <TextField
        
                        required
                        margin="dense"
                        id="expDate"
                        name="expDate"
              
                        type="date"
                        fullWidth
                        variant="standard"
                        value={values.expDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.expDate && !!errors.expDate}
                        helperText={touched.expDate && errors.expDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Copuns;
