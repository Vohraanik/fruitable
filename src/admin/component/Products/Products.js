import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { addProducts, deleteProducts, editproducts, getProducts } from '../../../redux/action/products.action';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

function Products(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
   
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    console.log(products);

    useEffect(()=>{
        dispatch(getProducts());
    },[]);


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
        dispatch(getProducts());
    };

    const handleDelete = (id) => {
     dispatch(deleteProducts(id));
    }   

    const ProductsSchema = object({
        name: string().required(),
        description: string().required(),
        price: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
        },
        validationSchema: ProductsSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editproducts(values))
            } else {
                dispatch(addProducts(values));
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
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
            {products.isLoading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) :products.error ? (
                <div>{products.error}</div>
            ) : (
                <div>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add Product
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{update ? 'Edit Product' : 'Add Product'}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Product Name"
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
                                    required
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

                                <TextField
                                    required
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="Enter Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    error={touched.price && Boolean(errors.price)}
                                    helperText={touched.price && errors.price}
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
                        <DataGrid rows={products.products} columns={columns} pageSize={5} checkboxSelection />
                    </div>
                </div>
            )}
        </>
      
    );
}

export default Products;
