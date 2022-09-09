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
    const wholestate = useSelector((state) => state.AllUsers)
    const mystate = useSelector((state) => state.AllUsers.Users)
    const currLoginUser = wholestate.LoginUser

    let filteruser;
    let filterCompany
    let CompanyName;


    if (currLoginUser?.type !== 'company') {
        console.log('currLoginUser====>', currLoginUser)


        filteruser = wholestate.Users?.find((v) => v.Email === currLoginUser.Email)
        console.log('filtered User data from table comp====>', filteruser)

        CompanyName = filteruser?.CompanyName
        console.log('CompanyName====>', CompanyName)

        filterCompany = wholestate.Company?.find((v) => v.CompanyName === CompanyName)
        console.log('filtered Company data from table comp====>', filterCompany)

    }
    else {
        filterCompany = wholestate?.Company?.find((v) => v.Email === currLoginUser.Email)
        console.log('Else filterCompany===>', filterCompany)

    }
    // let findUserByCompany = wholestate.Company.find((v) => v.Email === checkCurrLogin)
    // findUserByCompany = findUserByCompany?.CompanyName
    // console.log('findUserByCompany', findUserByCompany)



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
                const filter = mystate.find((v) => v.Email === cellValues.row.email)
                return (
                    <BasicSelect option={filter.userRole} role={role} changeRole={setRole} />
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

    // const mystate = useSelector((state) => state.AllUsers.Users)
    console.log('State UPDATED====>', mystate)

    mystate.map((user, id) => {
        console.log('user.type !== company', user.type)
        if (user.type !== 'company') {
            if (user.CompanyName === filterCompany?.CompanyName) {

                if (!user?.isDeleted) {
                    rows.push(
                        { id: user.id, firstName: user.FirstName, lastName: user.LastName, email: user.Email, key: id }

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

