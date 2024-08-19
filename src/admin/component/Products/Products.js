import React, { useEffect, useState } from 'react';

import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addproducts, deleteproducts, editproducts, getproducts
} from '../../../redux/slice/products.slice';
import { getSubcategory } from '../../../redux/action/subcategory.action';
import { getcategory } from '../../../redux/slice/category.slice';
import * as Yup from 'yup';

function Products() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  const subcategories = useSelector((state) => state.subcategories.subcategory);
  const categories = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.products);
 

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getSubcategory());
    dispatch(getcategory());
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
    dispatch(deleteproducts(id));
  };

  const ProductsSchema = object({
    image: Yup.mixed().required('File is required')
    .test('size', 'Size must be less than 2MB', (value) => {
      if (value?.size) {
        return value.size <= 2 * 1024 * 1024; 
      }
      return true;
    })
    .test('fileType', 'File must be a PDF, JPG, or SVG', (value) => {
      if (value?.type) {
        const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png', 'image/svg+xml'];
        return supportedFormats.includes(value.type);
      }
      return true;
    }),
    name: string().required('Name is required'),
    description: string().required('Description is required'),
    price: string().required('Price is required'),
    subcategory_id: string().required('Subcategory is required'),
    category_id: string().required('Category is required'),

  });

  const formik = useFormik({
    initialValues: {
      image: '',
      name: '',
      description: '',
      price: '',
      subcategory_id: '',
      category_id: '',
    },
    validationSchema: ProductsSchema,
    onSubmit: (values, { resetForm }) => {
      if (update) {
        dispatch(editproducts(values));
      } else {
        dispatch(addproducts(values));
      }
      resetForm();
      handleClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = formik;



  const handleFileChange = (event) => {
    setFieldValue('image', event.currentTarget.files[0]);
  };



  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 70,
      renderCell: (params) => {
        return (
          <img
            src={params.value.url}
            alt="product"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        );
      },
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'category_id', headerName: 'Category', width: 130,
      renderCell: (params) => {
        const category = categories.find((v) => v._id === params.row.category_id);
        return category ? category.name : '';
      }
    },
    {
      field: 'subcategory_id', headerName: 'Subcategory', width: 130,
      renderCell: (params) => {
        const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
        return subcategory ? subcategory.name : '';
      }
    },
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
      {products.isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={products.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : products.error ? (
        <div>{products.error}</div>
      ) : (
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            Add Product
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{update ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <DialogContent>

                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category_id"
                    value={values.category_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
       
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                  <Select
                    labelId="subcategory-select-label"
                    id="subcategory-select"
                    name="subcategory_id"
                    value={values.subcategory_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {

                      subcategories.filter((v) => v.categories_id == values.category_id)
                        .map((sub) => (
                          <MenuItem key={sub._id} value={sub._id}>
                            {sub.name}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
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
                <input
                  // id='image'
                  type="file"
                  name="image"
                  onBlur={handleBlur}
                  onChange={handleFileChange}
                  error={touched.image && Boolean(errors.image)}
                />
                {values?.image &&
                  <img  alt="product" 
                  src={values?.image.url ? values?.image.url : URL.createObjectURL(values.image)}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                }


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
              rows={products.products}
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

export default Products;
