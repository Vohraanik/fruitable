import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { getcategory } from '../../../redux/slice/category.slice';
import { getproducts } from '../../../redux/slice/products.slice';
import { getSubcategory } from '../../../redux/action/subcategory.action';
import { addVariant, deleteVariant, editVariant, getVariants } from '../../../redux/slice/varients.slice';

function Variants(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [imgFields, setImgFields] = useState([]);
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.category.category);
    const subcategories = useSelector((state) => state.subcategories.subcategory);
    const variants = useSelector((state) => state.varients.varients);

    useEffect(() => {
        dispatch(getVariants());
        dispatch(getSubcategory());
        dispatch(getcategory());
        dispatch(getproducts());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        setDynamicFields([]);
        setImgFields([]);
        formik.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        setDynamicFields([]);
        setImgFields([]);
        formik.resetForm();
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
            img: data.img
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
        const imgPreviews = data.img.map((img) => ({
            file: null,
            preview: img.url
        }));
        setImgFields(imgPreviews);
    };

    const handleDelete = (id) => {
        dispatch(deleteVariant(id));
    };

    const variantSchema = object({
        subcategoryId: string().required('Subcategory is required'),
        categoryId: string().required('Category is required'),
        productId: string().required('Product is required'),
    });

    const formik = useFormik({
        initialValues: {
            is_active: true,
            subcategoryId: '',
            categoryId: '',
            productId: '',
            additionalFields: [],
            img: []
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributes = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});

            const formData = new FormData();
            formData.append('is_active', values.is_active);
            formData.append('subcategoryId', values.subcategoryId);
            formData.append('categoryId', values.categoryId);
            formData.append('productId', values.productId);
            Object.entries(attributes).forEach(([key, value]) => formData.append(`attributes[${key}]`, value));
            imgFields.forEach((img, index) => {
                if (img.file) {
                    formData.append('img', img.file);
                }
            });

            if (update) {
                dispatch(editVariant(formData));
            } else {
                dispatch(addVariant(formData));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const addImgField = () => {
        setImgFields([...imgFields, { file: null, preview: '' }]);
    };

    const removeImgField = (index) => {
        const updatedFields = [...imgFields];
        updatedFields.splice(index, 1);
        setImgFields(updatedFields);
    };

    const handleImgFieldChange = (index) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const updatedFields = [...imgFields];
            updatedFields[index] = { file, preview: URL.createObjectURL(file) };
            setImgFields(updatedFields);
        }
    };

    const columns = [
        { field: 'is_active', headerName: 'Active', width: 90, renderCell: (params) => (params.value ? 'Yes' : 'No') },
        {
            field: 'categoryId', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.categoryId);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategoryId', headerName: 'Subcategory', width: 130,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategoryId);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'productId', headerName: 'Product', width: 130,
            renderCell: (params) => {
                const product = products.find((v) => v._id === params.row.productId);
                return product ? product.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 400,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        {
            field: 'img', headerName: 'Images', width: 400,
            renderCell: (params) => {
                const img = params.row.img;
                return img ? img.map(i => <img key={i._id} src={i.url} alt="preview" style={{ width: '50px', height: '50px', marginRight: '10px' }} />) : '';
            }
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="categoryId"
                                    value={values.categoryId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>
                                            {v.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.categoryId && errors.categoryId ? (
                                    <div>{errors.categoryId}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategoryId"
                                    value={values.subcategoryId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories.filter((v) => v.categoryId === values.categoryId)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.subcategoryId && errors.subcategoryId ? (
                                    <div>{errors.subcategoryId}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="productId"
                                    value={values.productId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        products.filter((v) => v.subcategoryId === values.subcategoryId)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.productId && errors.productId ? (
                                    <div>{errors.productId}</div>
                                ) : null}
                            </FormControl>
                            <div>
                                {dynamicFields.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].key`}
                                            name={`additionalFields[${i}].key`}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'key')}
                                            value={f.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].value`}
                                            name={`additionalFields[${i}].value`}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'value')}
                                            value={f.value}
                                        />
                                        <IconButton onClick={() => removeField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField} style={{ marginTop: "20px" }}>
                                    Add Field
                                </Button>
                            </div>
                            <div>
                                {imgFields.map((img, i) => (
                                    <div key={i} style={{ display: 'flex', gap: "20px", alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            onChange={handleImgFieldChange(i)}
                                            style={{ display: 'none' }}
                                            id={`img[${i}].file`}
                                            name={`img[${i}].file`}
                                            accept="image/*"
                                        />
                                        <label htmlFor={`img[${i}].file`}>
                                            <Button variant="contained" component="span">
                                                Upload
                                            </Button>
                                        </label>
                                        {img.preview && (
                                            <img src={img.preview} alt="preview" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        )}
                                        <IconButton onClick={() => removeImgField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addImgField} style={{ marginTop: "20px" }}>
                                    Add Image
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
}

export default Variants;
