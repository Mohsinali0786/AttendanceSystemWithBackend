import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BasicSelect from './basicMenu'
import { deleteData, editData } from '../store/actions/index'
import LottieControl from '../Componenet/lottie'


export default function MyDataGrid() {
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false)
    const [editBtnClicked, setEditBtnClicked] = useState(false)
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    const wholestate = useSelector((state) => state.AllUsers)

    const mystate = useSelector((state) => state.AllUsers.Users)
    // console.log('wholestate in datagrid', mystate)
    const currLoginUser = wholestate.LoginUser?.LoginUser
    // console.log('wholestate in datagrid', currLoginUser)


    let filteruser;
    let filterCompany
    let CompanyName;
    if (currLoginUser?.type !== 'company') {
        // console.log('iffffffffffffffffff')
        filteruser = wholestate.Users?.find((v) => v.email === currLoginUser?.email)
        CompanyName = filteruser?.CompanyName
        filterCompany = wholestate.Company?.find((v) => v.CompanyName === CompanyName)
    }
    else {
        filterCompany = wholestate?.Company?.find((v) => v.email === currLoginUser.email)
        // console.log('filterCompany in datagrid', filterCompany)
    }
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
        },
        {
            field: "role",
            width: 120,
            headerName: 'Role',
            type: 'role',
            editable: true,
            // flex: 1,

            renderCell: (cellValues) => {
                const filter = mystate.find((v) => v.email === cellValues.row.email)
                return (
                    <BasicSelect option={filter?.userRole} role={role} changeRole={setRole} />
                );
            }
        },
        {
            field: "Edit",
            width: 120,
            // flex: 1,
            editable: true,

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

    mystate.map((user, id) => {
        // console.log('userEmail', user.Email)
        // console.log('currLoginUser.Email', currLoginUser.Email)
        if (user.type !== 'company') {
            if (user.companyName === filterCompany?.companyName) {
                if (!user?.isDeleted) {
                    rows.push(
                        { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, key: id }

                    )
                }
            }

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

    // console.log('Role====>', role)

    const handleGetRowId = (e) => {
        console.log('handleGetRowId===>', e)
        return e.id
    }
    return (
        // <></>

        <Box sx={{ height: 400, width: '100%' }}>
            {
                rows.length !== 0 ?
                    <DataGrid
                        rows={rows}
                        getRowId={handleGetRowId}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    /> :
                    <LottieControl />
            }
        </Box>
    );
}

