import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material'
import MyDataGrid from '../Componenet/dataGrid'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SideDrawer from '../Componenet/sideDrawer'




function AdminPage() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)
    const findUser = mystate.Users.find((v) => v.Email === mystate.LoginUser.Email)
    let filteruser;
    let CompanyName;
    let UserName;
    if (mystate.LoginUser.type === 'company') {

        filteruser = mystate.Company.find((v) => v.Email === mystate.LoginUser.Email)
        UserName = filteruser.CompanyName
        console.log('Admin Com Name', UserName)
    }
    else {
        filteruser = mystate.Users.find((v) => v.Email === mystate.LoginUser.Email)
        // caches.log('filterusers======>', filteruser)
        UserName = filteruser?.FirstName + " " + filteruser?.LastName


    }
    let IsLoggedIn = mystate.IsLoggedIn
    useEffect(() => {
        if (!IsLoggedIn) {
            Navigate('/')
        }
    }, [IsLoggedIn === false])

    return (
        <div>
            <div className='admin-header'>
                <SideDrawer UserName={UserName} filteruser={filteruser} />

                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    {/* <Button variant='outlined' className='signout-btn' onClick={() => dispatch(signOut())}>
                    </Button> */}
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => dispatch(signOut())} />
                </div>
            </div>
            <div>

                <div className='HomePageBtn-div'>
                    {
                        filteruser?.type !== 'company' ?

                            <Button onClick={() => { Navigate('/Student') }}>Your Attendance</Button>
                            :
                            ""
                    }
                    <Button onClick={() => { Navigate('/Home') }}>Go to Home</Button>
                    <Button onClick={() => { Navigate('/SignUpForm') }}>Add User</Button>
                </div>
                <h2>{CompanyName}</h2>
                <h3>Administrator Dashboard</h3>
                <MyDataGrid />
            </div>


        </div >

    )
}
export default AdminPage;