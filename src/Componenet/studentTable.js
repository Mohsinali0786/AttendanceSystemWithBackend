import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { SignalCellularNull } from '@mui/icons-material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function StudentTable(props) {

    const [data, setData] = useState([])
    const [addDateClicked, setAddDateClicked] = useState(false);
    const MyState = useSelector((state) => state)
    const dispatch = useDispatch()

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mydate = new Date()


    let DataFromLS = []
    let C_Date = JSON.parse(localStorage.getItem("Attedance"))
    let C_User = useSelector((state) => state.AllUsers)

    useEffect(() => {

        // setUserEmail(props.UserEmail)

        GetDataFromLS()

    }, [])
    useEffect(() => {
        console.log('Reducer State===>', MyState.AllUsers.Attendance)
        setAddDateClicked(false)
    }, [addDateClicked])
    const GetDataFromLS = () => {
        if (localStorage.getItem("Attedance") !== null) {
            DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
            setData(DataFromLS)
        }
    }
    const AddDate = () => {
        // console.log('C_Date', C_Date)
        // console.log('C_User.LoginUser', C_User.LoginUser)
        // if (JSON.parse(JSON.parse(localStorage.getItem("Attedance").Email))) {
        const CurrDate = mydate.getDate() + "-" + Month[(mydate.getMonth())] + "-" + mydate.getFullYear()
        const CurrTime = mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds()

        if (C_Date !=== null) {

            C_Date?.map((data) => {
                console.log(data, "Map Running")
                console.log('data.Email', data.Email)
                console.log('C_User.LoginUser.Email', C_User.LoginUser.Email)
                if (data.Email !== C_User.LoginUser.Email) {

                    setAddDateClicked(true)
                    let CurrDay = mydate.getDay()
                    CurrDay = weekday[CurrDay]
                    console.log(CurrDate, 'mydate.getDate()')
                
            })
            setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: props.UserEmail }])

                    dispatch({
                        type: "ADDDATE",
                        payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present' }]
                    })

                    console.log('Data State======>=====++++', data)
                    localStorage.setItem('Attedance', JSON.stringify(data))
                }


        }

        else {
        setAddDateClicked(true)
        let CurrDay = mydate.getDay()
        CurrDay = weekday[CurrDay]
        setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: props.UserEmail }])

        dispatch({
            type: "ADDDATE",
            payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present' }]
        })

        console.log('Data State======>=====++++', data)
        localStorage.setItem('Attedance', JSON.stringify(data))

    }

    // }
}
return (
    <TableContainer component={Paper}>

        <div className='addAttBtn-div'>
            <Button onClick={() => { AddDate() }}>Add Attendance</Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Time</StyledTableCell>
                    <StyledTableCell align="center">Day</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, i) => {
                    if (row.Email === props.UserEmail) {
                        return (
                            < StyledTableRow
                                key={i}
                            >
                                <StyledTableCell align="center" component="th" scope="row">
                                    {row.CurrDate}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.CurrTime}</StyledTableCell>
                                <StyledTableCell align="center">{row.CurrDay}</StyledTableCell>
                                <StyledTableCell align="center">{row.Status}</StyledTableCell>
                            </StyledTableRow>
                        )
                    }
                })}
            </TableBody>
        </Table>
    </TableContainer >
);
}
