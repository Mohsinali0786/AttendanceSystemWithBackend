import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function StudentTable(props) {
    const [data, setData] = useState([])
    const [addDateClicked, setAddDateClicked] = useState(false);
    const MyState = useSelector((state) => state)
    const dispatch = useDispatch()
    const mystate = useSelector((state) => state)
    const currLoginUser = mystate?.AllUsers.LoginUser
    const filterdata = mystate?.AllUsers?.Users.find((v) => v.Email === currLoginUser.Email)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mydate = new Date()
    let DataFromLS = []
    let C_Date = JSON.parse(localStorage.getItem("Attedance"))
    console.log('C_Date===>', C_Date)

    let C_User = useSelector((state) => state.AllUsers)
    console.log('C_User===>', C_User)

    useEffect(() => {
        GetDataFromLS()
    }, [])
    useEffect(() => {
        setAddDateClicked(false)
        if (data.length !== 0) {
            localStorage.setItem('Attedance', JSON.stringify(data))
        }
    }, [addDateClicked === true])

    const GetDataFromLS = () => {
        if (localStorage.getItem("Attedance") !== null) {
            DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
            setData(DataFromLS)
        }
    }
    const AddDate = () => {

        // console.log('C_User', C_User.Users)


        const CurrDate = mydate.getDate() + "-" + Month[(mydate.getMonth())] + "-" + mydate.getFullYear()
        const CurrTime = mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds()
        if (C_Date !== null) {
            let filterEmail = C_Date?.filter((mydata) => mydata.Email === C_User.LoginUser.Email && mydata.CompanyName === C_User.LoginUser.Company)

            let findCurrDate = filterEmail.find((isCurrDate) => isCurrDate.CurrDate === CurrDate)
            if (filterEmail.length !== 0) {
                if (!findCurrDate) {
                    setAddDateClicked(true)
                    let CurrDay = mydate.getDay()
                    CurrDay = weekday[CurrDay]
                    setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: props.UserEmail, CompanyName: C_User.LoginUser.Company }])
                    dispatch({
                        type: "ADDDATE",
                        payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser.Company }]
                    })
                    localStorage.setItem('Attedance', JSON.stringify(data))

                }
            }
            else {
                console.log('ELse running')
                setAddDateClicked(true)
                let CurrDay = mydate.getDay()
                CurrDay = weekday[CurrDay]
                setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: props.UserEmail, CompanyName: C_User.LoginUser.Company }])
                dispatch({
                    type: "ADDDATE",
                    payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser.Company }]
                })
                localStorage.setItem('Attedance', JSON.stringify(data))
            }
        }
        else {
            setAddDateClicked(true)
            let CurrDay = mydate.getDay()
            CurrDay = weekday[CurrDay]
            setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: props.UserEmail, CompanyName: C_User.LoginUser?.Company }])
            dispatch({
                type: "ADDDATE",
                payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser?.Company }]
            })
        }
    }
    return (
        <TableContainer component={Paper}>
            <div className='addAttBtn-div'>
                <Button onClick={() => { AddDate() }}>Add Attendance</Button>
            </div>

        </TableContainer >
    );
}
