import AllStudentTable from './Table'
import { signOut } from '../store/actions'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Home() {
    const [AllAttendance, setAllAttendance] = useState()
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const [LoginUser, setLoginUser] = useState()

    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.AllUsers)
    const Navigate = useNavigate()
    let IsLoggedIn = mystate.IsLoggedIn

    // console.log('Admin mystate', mystate)
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.Email)
        // UserEmail = mystate.LoginUser.Email
        // console.log('UserEmail Effect', UserEmail)
        CheckAdminOrUser()

    })
    useEffect(() => {

        let DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
        console.log('DataFromLS', DataFromLS)
        setAllAttendance(DataFromLS)
    }, [])

    useEffect(() => {

        if (!IsLoggedIn) {
            Navigate('/')
        }
    }, [IsLoggedIn === false])
    const CheckAdminOrUser = () => {
        mystate.Users.map((user, index) => {
            if (user.Email === UserEmail) {
                if ((user?.userRole)?.toLowerCase() === 'admin') {
                    console.log('user.UserRole === admin')
                    setAdminRole(true)
                }
            }
        })
    }


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
                {/* <Button onClick={() => { Navigate('/Student') }}>Go to Attendance Section</Button> */}
                <p style={{ marginRight: '20px' }}>{UserEmail} (logged-in)</p>
            </div >

            <div className='HomePageBtn-div'>
                <Button onClick={() => { Navigate('/Student') }}>Go to Attendance Section</Button>
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


            <AllStudentTable AllStudents={AllAttendance} />
        </div >

    )

}
export default Home