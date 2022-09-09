import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux"


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

export default function CustomizedTables(props) {
    const mystate = useSelector((state) => state)
    console.log('state from table comp====>', mystate)

    const currLoginUser = mystate?.AllUsers.LoginUser

    let filteruser;
    let filterCompany
    let CompanyName;
    if (currLoginUser?.type === 'company') {

        filterCompany = mystate.AllUsers.Company?.find((v) => v.Email === currLoginUser.Email)
        CompanyName = filterCompany?.CompanyName
        // console.log('filtered data from table comp====>', filterCompany)

        filteruser = mystate.AllUsers.Users?.find((v) => v.CompanyName === CompanyName)
        // console.log('filtered users data from table comp====>', filteruser)

    }
    else {
        filteruser = mystate.AllUsers?.Users?.find((v) => v.Email === currLoginUser.Email)

    }

    console.log('currLoginUser', currLoginUser)
    // const filterdata = mystate?.AllUsers?.Users.find((v) => v.Email === currLoginUser.Email)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Company</StyledTableCell>

                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell >Current Date</StyledTableCell>
                        <StyledTableCell >Current Time</StyledTableCell>
                        <StyledTableCell >Current Day</StyledTableCell>
                        <StyledTableCell >Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.AllStudents?.map((row, index) => {
                        if (filteruser?.CompanyName === row?.CompanyName) {

                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell >{row.CompanyName}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.Email}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.CurrDate}</StyledTableCell>
                                    <StyledTableCell >{row.CurrTime}</StyledTableCell>
                                    <StyledTableCell >{row.CurrDay}</StyledTableCell>
                                    <StyledTableCell >{row.Status}</StyledTableCell>
                                </StyledTableRow>
                            )
                        }

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
