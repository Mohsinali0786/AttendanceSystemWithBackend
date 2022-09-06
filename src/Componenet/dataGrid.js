import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BasicSelect from './basicMenu'
import { deleteData, editData } from '../store/actions/index'



export default function MyDataGrid() {

    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false)
    const [editBtnClicked, setEditBtnClicked] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()


    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 100,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 100,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 170,
            editable: true,
            // flex: 1,
        },
        {
            field: "role",
            width: 120,
            headerName: 'Role',
            type: 'role',
            editable: true,
            // flex: 1,
            renderCell: (cellValues) => {
                return (
                    <BasicSelect role={role} changeRole={setRole} />
                );
            }
        },
        {
            field: "Edit",
            width: 120,
            // flex: 1,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        className='EditDelBtn'
                        onClick={(event) => {
                            dispatch(editData(cellValues, role));
                        }}
                    >Edit
                    </Button>
                );
            }
        },
        {
            field: "actions",
            width: 120,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        className='EditDelBtn'
                        onClick={(event) => {
                            dispatch(deleteData(cellValues, role));
                        }}
                    >
                        Delete
                    </Button >
                );
            }
        }


    ];

    useEffect(() => {

        setDeleteBtnClicked(false)


    }, [deleteBtnClicked === true])




    let rows = [];

    const mystate = useSelector((state) => state.AllUsers.Users)
    console.log('State UPDATED====>', mystate)

    mystate.map((user, id) => {
        // console.log('user in dataGrid', user?.isDeleted)
        if (!user?.isDeleted) {

            rows.push(
                { id: user.id, firstName: user.FirstName, lastName: user.LastName, email: user.Email, key: id }

            )
        }
    })
    // const deleteData = (v) => {
    // setDeleteBtnClicked(true)


    // let filtered = mystate.filter((user, id) => user.id !== v.id)
    // console.log(filtered)



    // mystate.filter((user, id) => {

    //     console.log('user====>', user.id)
    //     console.log('Clicked Id====>', v.id)


    //     if (user.id === v.id) {
    //         // mystate.splice(user.id, 1)
    //         // console.log('If running')
    //     }
    // })

    // console.log('Updated State ', mystate)
    // }
    // const editData = (e, v) => {
    //     setEditBtnClicked(true)

    //     mystate.filter((user, id) => {

    //         if (user.id === v.id)
    //             mystate
    //         console.log('If running')
    //     })

    //     console.log('Updated State ', mystate)
    // }

    console.log('Role====>', role)

    const handleGetRowId = (e) => {
        // console.log('handleGetRowId===>', e)
        return e.id
    }
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={handleGetRowId}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}

