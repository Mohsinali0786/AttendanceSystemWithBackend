import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@mui/material'
import MyDataGrid from '../Componenet/dataGrid'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';



function AdminPage() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)
    const findUser = mystate.Users.find((v) => v.Email === mystate.LoginUser.Email)
    let filteruser;
    let CompanyName;
    if (mystate.LoginUser.type === 'company') {

        filteruser = mystate.Company.find((v) => v.Email === mystate.LoginUser.Email)
        CompanyName = filteruser.CompanyName
    }
    else {
        filteruser = mystate.Users.find((v) => v.Email === mystate.LoginUser.Email)

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