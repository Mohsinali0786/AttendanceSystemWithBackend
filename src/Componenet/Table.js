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
import { useState, useEffect } from 'react';


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

export default function CustomizedTables(props) {
    // console.log(props?.UserEmail, "=======-----------==>")
    console.log(props?.AllStudents, "All Students=======-----------==>")
    const mystate = useSelector((state) => state)
    const filteredData = props.AllStudents?.filter(data => data.Email === props.UserEmail)

    const currLoginUser = mystate?.AllUsers.LoginUser
    let filteruser;
    let filterCompany
    let CompanyName;
    if (currLoginUser?.type === 'company') {
        filterCompany = mystate.AllUsers.Company?.find((v) => v.Email === currLoginUser.Email)
        CompanyName = filterCompany?.CompanyName
        console.log('CompanyNAme===>', CompanyName)
        filteruser = mystate.AllUsers.Users?.find((v) => v.CompanyName === CompanyName)
        console.log('currLoginUser?.Type', currLoginUser)

    }
    else {
        filteruser = mystate.AllUsers?.Users?.find((v) => v.Email === currLoginUser?.Email)

    }
    return (
        <>
            {

                currLoginUser?.type === 'company' ?
                    < TableContainer component={Paper}>
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
                                {props?.AllStudents?.map((row, index) => {
                                    if (CompanyName === row.CompanyName) {
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
                    </TableContainer> :


                    props.AllStudents && !props.UserEmail ?
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
                                        if (currLoginUser.Company === row?.CompanyName) {
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
                        </TableContainer> :
                        props.AllStudents && props.UserEmail ?
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
                                        {
                                            filteredData?.map((row, index) => {
                                                console.log('row====>', row)
                                                // console.log('props.UserEmail', props.UserEmail)
                                                console.log('currLoginUser.Email', currLoginUser.Company)
                                                if (row.CompanyName === currLoginUser.Company) {
                                                    console.log('ifffffff')

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

                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :

                            "No Record Found"
            }
        </>
    );
}
