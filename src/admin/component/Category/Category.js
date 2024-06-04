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

function Category() {

    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(null);

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/categories/list-categories");
            const data = await response.json();
            console.log(data.data);
            setData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const categorySchema = object({
        name: string().required("Category is required").matches(/^[a-zA-Z'-\s]*$/, 'Invalid name'),
        description: string().required("Description is required").min(10, "Must be at least 10 characters"),
    });

    const handleAdd = async(data) => {
        // let localData = JSON.parse(localStorage.getItem("category")) || [];
        // let rfn = Math.floor(Math.random() * 1000);
        // localData.push({ ...data, id: rfn });
        // localStorage.setItem("category", JSON.stringify(localData));
        // getData();
        try {
        await fetch("http://localhost:8080/api/v1/categories/add-categories",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSON.stringify(data)
        });

        } catch (error) {
            console.log(error);
        }
        getData();
    };

    const handleDelete = async(id) => {
        // let localData = JSON.parse(localStorage.getItem("category")) || [];
        // localData = localData.filter(item => item.id !== id);
        // localStorage.setItem("category", JSON.stringify(localData));
        try {
            await fetch("http://localhost:8080/api/v1/categories/delete-categories/" + id,{
                method: 'DELETE'
            })
        } catch (error) {
            
        }
        getData();
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setEdit(data);
        handleClickOpen();
    };

    const handleUpdate = async(data) => {
        // let localData = JSON.parse(localStorage.getItem("category")) || [];
        // let index = localData.findIndex(item => item.id === data.id);
        // localData[index] = data;
        // localStorage.setItem("category", JSON.stringify(localData));

        try {
            await fetch("http://localhost:8080/api/v1/categories/update-categories/"+ data._id,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body:JSON.stringify(data)
            });
    
            } catch (error) {
                console.log(error);
            }

        getData();
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                handleUpdate(values);
            } else {
                handleAdd(values);
            }
            resetForm();
            handleClose();
        }
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEdit(null);
        formik.resetForm();
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 130
        },
        {
            field: 'description',
            headerName: 'Description',
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
                    onClick={() => handleDelete(params.row._id)}
                    startIcon={<DeleteIcon />}
                >
                    Delete
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
                    Edit
                </Button>
            ),
        }
    ];

    return (
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
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        getRowId={(row)=>row._id}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </div>
            </div>
        </>
    );
}

export default Category;
