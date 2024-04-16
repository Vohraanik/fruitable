import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { object, string } from 'yup';
import { addData, deleteData, editData, getData } from '../../../redux/action/organic.action';
import { DataGrid } from '@mui/x-data-grid';
import { Backdrop, CircularProgress } from '@mui/material';


function Oerganic(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();

    const organic = useSelector((state) => state.organic);
    console.log(organic);

    useEffect(() => {
        dispatch(getData());
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
        dispatch(deleteData(id))
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true);
    };

    let organicSchema = object({
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
        validationSchema: organicSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
               dispatch(editData(values))
            } else {
             dispatch(addData(values))
            }
            resetForm();
            handleClose();
        },
    });

    const columns = [
        { field: 'name', headerName: ' Name', width: 130 },
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

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    return (
<>
  {organic.isLoading ? (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : organic.error ? (
    <div>{organic.error}</div>
  ) : (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Organic
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Organic</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              name="name"
              label="Organic item"
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
              label="Organic Description"
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
              margin="dense"
              id="price"
              name="price"
              label="Price"
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
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {update ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={organic.organic}
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

export default Oerganic;
