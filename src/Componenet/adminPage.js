import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material'
import MyDataGrid from './dataGrid'
import { Link } from 'react-router-dom';



function AdminPage() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)
    console.log('My State=====>', mystate)
    let IsLoggedIn = mystate.IsLoggedIn
    useEffect(() => {
        if (!IsLoggedIn) {
            Navigate('/')
        }
    }, [IsLoggedIn === false])

    return (
        <div>
            <div className='admin-header'>
                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant='outlined' className='signout-btn' onClick={() => dispatch(signOut())}>signOut</Button>
                </div>
            </div>
            <div>
                <h3>Administrator Dashboard</h3>
                <div className='HomePageBtn-div'>
                    <Button onClick={() => { Navigate('/Student') }}>Your Attendance</Button>
                    <Button onClick={() => { Navigate('/Home') }}>Go to Home</Button>
                    <Button onClick={() => { Navigate('/SignUpForm') }}>Add User</Button>
                </div>
                <MyDataGrid />
            </div>


        </div >

    )
}
export default AdminPage;