import AllStudentTable from './Table'
import { signOut } from '../store/actions'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideDrawer from './sideDrawer'
import LogoutIcon from '@mui/icons-material/Logout';

function Home() {
    const [AllAttendance, setAllAttendance] = useState()
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const [LoginUser, setLoginUser] = useState()

    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.AllUsers)

    const filteruser = mystate.Users.find((v) => v.Email === UserEmail)
    console.log('Filter User', filteruser)
    const Navigate = useNavigate()
    let IsLoggedIn = mystate.IsLoggedIn
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.Email)

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
                <SideDrawer />
                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => dispatch(signOut())} />

                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ marginRight: '20px' }}>{UserEmail} (logged-in)</p>
            </div >

            <div className='HomePageBtn-div'>
                {
                    filteruser?.type !== 'company' ?
                        <Button onClick={() => { Navigate('/Student') }}>Your Attendance</Button>
                        :
                        ""

                }
                {

                    adminRole ?
                        <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                        :
                        UserEmail === 'nocodeai@gmail.com' ?
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