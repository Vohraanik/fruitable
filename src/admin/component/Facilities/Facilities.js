import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addFacilities, deleteFacilities, editFacilities } from '../../../redux/action/facilities.action';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Facilities(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);

    const facilities = useSelector((state) => state.facilities);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();
    };

    const handleDelete = (id) => {
        dispatch(deleteFacilities(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    };

    let facilitiesSchema = object({
        name: string().required(),
        description: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: facilitiesSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editFacilities(values));
            } else {
                const rfn = Math.floor(Math.random() * 1000);
                dispatch(addFacilities({ ...values, id: rfn }));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: ' Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
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
                        startIcon={<DeleteIcon />}
                    >
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(params.row)}
                        startIcon={<EditIcon />}
                    >
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>

            {
                facilities.isLoading ?    <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={facilities.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Facilities
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Add Facilities</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facilities Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Facilities Description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={touched.description && Boolean(errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">
                                        {update ? 'Update' : 'Add'}
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={facilities.facilities}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>

                    </>
            }



        </>
    );
}

export default Facilities;
