import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { addCoupons, deleteCoupons, editCoupons, getCoupons } from '../../../redux/slice/coupons.slice';

function Coupons(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const coupons = useSelector(state => state.coupons);

    useEffect(() => {
        dispatch(getCoupons())
    }, []);


    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();

    };

    const handleEdit = (data) => {
        formik.setValues(data);

        setOpen(true);
        setUpdate(true);

    };

    const handleDelete = (id) => {
        dispatch(deleteCoupons(id))
    }

    const couponsSchema = object({
        coupons: string().required(),
        percantage: number().required(),
        expiry: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupons: '',
            percantage: '',
            expiry: '',
        },
        validationSchema: couponsSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editCoupons(values))
            } else {
                dispatch(addCoupons(values));
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'coupons', headerName: 'Coupons', width: 100 },
        { field: 'percantage', headerName: 'Percantage', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <Button
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                 
                    >
                    Delete
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(params.row)}
              
                    >
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
                <div>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add Coupons
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{update ? 'Edit Coupons' : 'Add Coupons'}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    required
                                    margin="dense"
                                    id="coupons"
                                    name="coupons"
                                    label="coupons Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.coupons}
                                    error={touched.coupons && Boolean(errors.coupons)}
                                    helperText={touched.coupons && errors.coupons}
                                />

                                <TextField
                                    required
                                    margin="dense"
                                    id="description"
                                    name="percantage"
                                    label="Percantage"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.percantage}
                                    error={touched.percantage && Boolean(errors.percantage)}
                                    helperText={touched.percantage && errors.percantage}
                                />

                                <TextField
                                    required
                                    margin="dense"
                                    id="expiry"
                                    name="expiry"
                                    label="Enter Expiry Date"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.expiry}
                                    error={touched.expiry && Boolean(errors.expiry)}
                                    helperText={touched.expiry && errors.expiry}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">
                                    {update ? 'Update' : 'Add'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                     <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={coupons.coupons} columns={columns} pageSize={5} checkboxSelection />
                    </div> 
                </div>
            {/* )} */}
        </>

    );
}

export default Coupons;
