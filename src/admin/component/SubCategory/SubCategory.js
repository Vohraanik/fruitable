import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import {
    Backdrop, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addSubcategory, deletesubcategory, editsubcategory, getSubcategory } from '../../../redux/action/subcategory.action';
import { getcategory } from '../../../redux/slice/category.slice';

function Subcategories(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    
    const subcategories = useSelector((state) => state.subcategories);
    const category = useSelector(state => state.category.category);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getcategory())
        dispatch(getSubcategory());
    }, [dispatch]);

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
        dispatch(deletesubcategory(id));
    };

    const SubcategoriesSchema = object({
        categories_id: string().required(),
        name: string().required(),
        description: string().required(),
        is_active: boolean().required(),
    });

    const formik = useFormik({
        initialValues: {
            categories_id: '',
            name: '',
            description: '',
            is_active: true,
        },
        validationSchema: SubcategoriesSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editsubcategory(values));
            } else {
                dispatch(addSubcategory(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 130},
        { field: 'categories_id', headerName: 'Category', width: 150, 
            renderCell:(params)=>{
                const categori = category.find((v)=>v._id == params.row.categories_id);
                return categori ? categori.name : '';
            }
         },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'is_active', headerName: 'Active Status', width: 130, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
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
                        onClick={() => handleDelete(params.row._id)}
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
            subcategories.isLoading ? (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : subcategories.error ? (
                <div>{subcategories.error}</div>
            ) : (
                <div>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add Subcategory
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{update ? 'Edit Subcategory' : 'Add Subcategory'}</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <FormControl fullWidth>
                                    <InputLabel id="category-select-label" name="category">Category_id</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="categories_id"
                                        value={values.categories_id}
                                    >
                                        {category.map((v) => (
                                            <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Subcategory Name"
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
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="is-active-label">Active Status</InputLabel>
                                    <Select
                                        labelId="is-active-label"
                                        id="is_active"
                                        name="is_active"
                                        value={values.is_active}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.is_active && Boolean(errors.is_active)}
                                    >
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>Inactive</MenuItem>
                                    </Select>
                                    {touched.is_active && errors.is_active && (
                                        <p style={{ color: 'red' }}>{errors.is_active}</p>
                                    )}
                                </FormControl>
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
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={subcategories.subcategory}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Subcategories;
