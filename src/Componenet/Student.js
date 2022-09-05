import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { Button } from '@mui/material'
import StudentTable from './studentTable'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Student() {
    // let UserEmail;
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)

    let IsLoggedIn = mystate.IsLoggedIn
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.Email)
        // UserEmail = mystate.LoginUser.Email
        // console.log('UserEmail Effect', UserEmail)
        CheckAdminOrUser()

    })
    useEffect(() => {
        if (!IsLoggedIn) {
            Navigate('/')
        }
    }, [IsLoggedIn === false])

    const CheckAdminOrUser = () => {
        mystate.Users.map((user, index) => {
            if (user.Email === UserEmail) {
                console.log('user.UserRole ', user.userRole)

                if ((user?.userRole)?.toLowerCase() === 'admin') {
                    console.log('user.UserRole === admin')
                    setAdminRole(true)
                }
            }
        })
    }

    const dispatch = useDispatch()
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
                <div className='StudentName-div'>
                    <p>Attendance</p>
                    <p><i>{UserEmail}</i> (you-logged-in)</p>
                </div>
                <div className='StudentPageBtn-div'>


                    <Button onClick={() => { Navigate('/Home') }}>Go to Home</Button>
                    {
                        adminRole ?
                            <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                            :
                            UserEmail === 'mohsin@gmail.com' ?
                                <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                                :
                                ""
                    }
                </div>


                <StudentTable UserEmail={UserEmail} />
            </div>
        </div>
    )
}
export default Student