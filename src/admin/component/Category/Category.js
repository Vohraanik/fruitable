import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, deletecategory, editcategory, getcategory } from '../../../redux/slice/category.slice';
import { Backdrop, CircularProgress } from '@mui/material';

function Category() {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcategory());
    }, []);

    const category = useSelector(state => state.category);
    console.log(category);

    


    const categorySchema = object({
        name: string().required("Category is required").matches(/^[a-zA-Z'-\s]*$/, 'Invalid name'),
        description: string().required("Description is required").min(10, "Must be at least 10 characters"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                dispatch(editcategory({ ...values, id: edit._id }));
            } else {
                console.log(values);
                dispatch(addcategory(values));
            }
            resetForm();
            handleClose();
        }
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEdit(null);
        formik.resetForm();
    };

    const handleDelete = (id) => {
        dispatch(deletecategory(id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setEdit(data);
        handleClickOpen();
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(params.row._id)}
                    startIcon={<DeleteIcon />}
                >
                </Button>
            ),
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                    startIcon={<EditIcon />}
                >
                </Button>
            ),
        }
    ];

    return (
        <>
            {
                category.isLoading ? 
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>:
                    category.error ? <p>{category.error}</p> :
                        <>
                            <div>

                                <h1>Category Page</h1>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Add Category
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <form onSubmit={handleSubmit}>
                                        <DialogTitle>Category</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                margin="dense"
                                                id="name"
                                                name="name"
                                                label="Category Name"
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
                                                label="Description"
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
                                            <Button type="submit">{edit ? "Update" : "Add"}</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        getRowId={(row) => row._id}
                                        rows={category.category}
                                        columns={columns}

                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}


                                    />
                                </div>
                            </div>
                        </>
            }

        </>
    );
}

export default Category;
