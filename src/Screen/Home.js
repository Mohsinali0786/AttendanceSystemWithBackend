import AllStudentTable from '../Componenet/Table'
// import Students from '../Componenet/Student'
import { signOut } from '../store/actions'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideDrawer from '../Componenet/sideDrawer'
import LogoutIcon from '@mui/icons-material/Logout';

function Home() {
    const [AllAttendance, setAllAttendance] = useState()
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.AllUsers)
    // console.log('mystate Home', mystate)
    let filteruser;
    let UserName;
    if (mystate?.LoginUser?.type === 'company') {

        filteruser = mystate.Company.find((v) => v.Email === UserEmail)
        UserName = filteruser?.CompanyName
    }
    else {
        filteruser = mystate.Users.find((v) => v.Email === UserEmail)
        UserName = filteruser?.FirstName + " " + filteruser?.LastName

    }
    const Navigate = useNavigate()
    let IsLoggedIn = mystate.IsLoggedIn
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.Email)
        CheckAdminOrUser()
    })
    useEffect(() => {
        let DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
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
                    setAdminRole(true)
                }
            }
        })
    }
    console.log('All Attendance====>', AllAttendance)
    return (
        <div>
            <div className='admin-header'>
                <SideDrawer UserName={UserName} filteruser={filteruser} />
                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => dispatch(signOut())} />
                </div>
            </div>
            <div style={{}}>
                <p style={{ marginRight: '20px', textAlign: 'right' }}>{UserEmail} (logged-in)</p>
            </div >
            {/* <h3>{mystate?.LoginUser?.Company} Attendance System</h3> */}

            <div className='HomePageBtn-div'>
                {
                    filteruser?.type !== 'company' ?
                        <Button onClick={() => { Navigate('/Student') }}>Your Attendance</Button>
                        // <Button onClick={() => { setNavStudent('true') }}>Your Attendance</Button>

                        :
                        ""
                }
                {
                    adminRole ?
                        <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                        :
                        // UserEmail === 'nocodeai@gmail.com' && 
                        filteruser?.type === 'company' ?
                            <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                            :
                            ""
                }
            </div>
            {
                // !NavStudent ?

                <AllStudentTable AllStudents={AllAttendance} />
                // :
                // <>
                //     <Students />
                //     <AllStudentTable AllStudents={AllAttendance.filter((v) => v.Email === filteruser.Email)} />
                // </>



            }
        </div >

    )

}
export default Home