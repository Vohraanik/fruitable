import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

function Category(props) {

    const [data, setData] = useState([]);

    const getData = () => {
        const localData = JSON.parse(localStorage.getItem("category"));
        if (localData) {
            setData(localData);
        }
    }

    useEffect(() => {
        getData();
    }, []);




    let categorySchema = object({
        category: string().required("Category is required").matches(/^[a-zA-Z'-\s]*$/, 'Invalid name'),
        description: string().required("Description is required").min(10, "Must be at least 10 characters"),
    });

    const handleAdd = (data) => {
        console.log(data);
        let localData = JSON.parse(localStorage.getItem("category"));

        let rfn = Math.floor(Math.random() * 1000);

        if (localData) {
            localData.push({ ...data, id: rfn });
            localStorage.setItem("category", JSON.stringify(localData));
        } else {
            localStorage.setItem("category", JSON.stringify([{ ...data, id: rfn }]));
        }

        getData();
    }

    const handleDelete = (id)=>{
        let localData = JSON.parse(localStorage.getItem("category"));
        localData = localData.filter(item=>item.id !== id);
        localStorage.setItem("category", JSON.stringify(localData));
        getData();
    }

    const formik = useFormik({
        initialValues: {
            category: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: async (values, { resetForm }) => {
            handleAdd(values);
            resetForm();
            handleClose();
        }
    });


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    const columns = [
        {
            field: 'category',
            headerName: 'Category',
            width: 130
        },
        {
            field: 'description',
            headerName: ' Description',
            width: 130
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(params.row.id)}
                    startIcon={<DeleteIcon />}
                >
              
                </Button>
            ),
          }
    ]






    return (
        <div>
            <h1>Category Page</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}

                >
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Category</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="category"
                                name="category"
                                label="Category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                                error={errors.category && touched.category ? errors.category : false}
                                helperText={errors.category && touched.category ? errors.category : ''}
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
                                error={errors.description && touched.description ? errors.description : false}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
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
        </div>
    );
}

export default Category;
