import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { Button } from '@mui/material'
import AllStudentTable from '../Componenet/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import Swal from 'sweetalert2'



function Student() {
    // let UserEmail;
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const [AllAttendance, setAllAttendance] = useState()

    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)


    let IsLoggedIn = mystate?.LoginUser?.IsLoggedIn

    let filteruser;
    let UserName;
    if (mystate?.LoginUser?.LoginUser?.type === 'company') {

        filteruser = mystate.Company.find((v) => v.email === UserEmail)
        UserName = filteruser?.companyName
    }
    else {
        // console.log('mystate.LoginUser=====', UserEmail)

        filteruser = mystate.Users.find((v) => v.email === UserEmail && v.companyName === mystate?.LoginUser?.LoginUser?.company)
        // console.log('filterUser in student=====', filteruser)
        UserName = filteruser?.firstName + " " + filteruser?.lastName
        // console.log('UserName in UserName=====', UserName)

    }
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.LoginUser?.email)
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
                // console.log('user.UserRole ', user.userRole)

                if (filteruser?.userRole === 'admin') {
                    if ((user?.userRole)?.toLowerCase() === 'admin') {
                        // console.log('user.UserRole === admin')
                        setAdminRole(true)
                    }
                }

            }
        })
    }












    const [data, setData] = useState([])
    const [addDateClicked, setAddDateClicked] = useState(false);
    const mystate1 = useSelector((state) => state)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mydate = new Date()
    // let DataFromLS = []
    let C_Date = useSelector((state) => state.AllUsers.Attendance)
    console.log('C-Date===>', C_Date)


    let C_User = useSelector((state) => state.AllUsers.Users)
    // console.log('C_User===>', C_User)

    let currentUser = useSelector((state) => state.AllUsers?.LoginUser?.LoginUser)

    // console.log('Current user', currentUser)


    const signout = () => {
        let logoutInfo = {
            IsLoggedIn: false,
        }
        dispatch(signOut(logoutInfo))
    }
    const AddDate = () => {
        // console.log('C_User', C_User.Users)
        const currDate = mydate.getDate() + "-" + Month[(mydate.getMonth())] + "-" + mydate.getFullYear()
        const currTime = mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds()
        // console.log('C_DATEEEEEEEE', C_Date)
        if (C_Date !== null) {
            let filterEmail = C_Date?.filter((mydata) => mydata.email === currentUser.email && mydata.companyName === currentUser.company)
            // console.log('filterEmailfilterEmail', filterEmail)
            let findCurrDate = filterEmail.find((isCurrDate) => isCurrDate.currDate === currDate)
            // console.log('findCurrDate', findCurrDate)
            if (filterEmail.length !== 0) {
                if (!findCurrDate) {
                    setAddDateClicked(true)
                    let currDay = mydate.getDay()
                    let newObj = {
                        currDate: currDate,
                        currTime: currTime,
                        currDay: currDay,
                        status: 'Present',
                        email: UserEmail,
                        companyName: filteruser.companyName

                    }
                    currDay = weekday[currDay]
                    setData([...data, newObj])
                    dispatch({
                        type: "ADDDATE",
                        payload: newObj
                    })
                    axios.post('http://localhost:4000/api/addattendance', newObj)
                        .then((res) => {
                            // console.log('res.data?.status', res.data.status)
                            console.log(res.data, "=res= in sudent")

                            if (res.data?.status === 'success') {
                                Swal.fire({
                                    icon: res.data.status,
                                    text: res.data.message,
                                })

                            }
                            else {
                                Swal.fire({
                                    icon: res.data.status,
                                    text: res.data.message,
                                })

                            }


                        }).catch((err) => {
                            console.log('Error====>', err)
                        })
                    // localStorage.setItem('Attedance', JSON.stringify(data))

                }
            }
            else {
                // console.log('ELse running')
                setAddDateClicked(true)
                let currDay = mydate.getDay()
                currDay = weekday[currDay]
                let newObj = {
                    currDate: currDate,
                    currTime: currTime,
                    currDay: currDay,
                    status: 'Present',
                    email: UserEmail,
                    companyName: filteruser.companyName

                }
                setData([...data, { currDate: currDate, currTime: currTime, currDay: currDay, status: 'Present', email: UserEmail, companyName: filteruser.companyName }])
                dispatch({
                    type: "ADDDATE",
                    payload: { currDate: currDate, currTime: currTime, currDay: currDay, status: 'Present', email: UserEmail, companyName: filteruser.companyName }
                })

                axios.post('http://localhost:4000/api/addattendance', newObj)
                    .then((res) => {
                        // console.log(res.data?.status, "res.data?.status")
                        console.log(res.data, "=res= in sudent")

                        if (res.data?.status === 'success') {
                            Swal.fire({
                                icon: res.data.status,
                                text: res.data.message,
                            })

                        }
                        else {
                            Swal.fire({
                                icon: res.data.status,
                                text: res.data.message,
                            })

                        }

                        // console.log(res.data.AllCompanies, "=res=")
                        // setAllCompanies(res.data.AllCompanies)
                    }).catch((err) => {
                        console.log('Error====>', err)
                    })
                // localStorage.setItem('Attedance', JSON.stringify(data))
            }
        }
        else {
            setAddDateClicked(true)
            let currDay = mydate.getDay()
            currDay = weekday[currDay]
            let newObj = {
                currDate: currDate,
                currTime: currTime,
                currDay: currDay,
                status: 'Present',
                email: UserEmail,
                // companyName: C_User.LoginUser?.company
                companyName: filteruser?.companyName

            }
            setData([...data, { currDate: currDate, currTime: currTime, currDay: currDay, status: 'Present', email: UserEmail, companyName: filteruser.companyName }])
            dispatch({
                type: "ADDDATE",
                payload: { currDate: currDate, currTime: currTime, currDay: currDay, status: 'Present', email: UserEmail, companyName: filteruser.companyName }
            })
            axios.post('http://localhost:4000/api/addattendance', newObj)
                .then((res) => {
                    // console.log('running', res)
                    console.log(res.data.status, "res.data?.status")
                    if (res.data?.status === 'success') {
                        Swal.fire({
                            icon: res.data.status,
                            text: res.data.message,
                        })

                    }
                    else {
                        Swal.fire({
                            icon: res.data.status,
                            text: res.data.message,
                        })

                    }
                    // setAllCompanies(res.data.AllCompanies)
                }).catch((err) => {
                    console.log('Error====>', err)
                })
        }
    }








    const dispatch = useDispatch()
    // console.log('Al Attendance', AllAttendance)
    return (
        <div>
            <div className='admin-header'>
                <div>
                    <h1 className='Header-heading' >Attendance Management System</h1>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => signout()} />

                    {/* <Button variant='outlined' className='signout-btn' onClick={() => dispatch(signOut())}>signOut</Button> */}
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
                            // UserEmail === 'mohsin@gmail.com' ?
                            //     <Button onClick={() => { Navigate('/AdminPage') }}>Go to AdminPage</Button>
                            //     :
                            ""
                    }
                </div>
                {/* <StudentTable UserEmail={UserEmail} /> */}
                {/* <StudentTable UserEmail={UserEmail} /> */}
                <div className='addAttBtn-div'>
                    <Button onClick={() => { AddDate() }}>Add Attendance</Button>
                </div>
                <AllStudentTable AllStudents={C_Date} UserEmail={UserEmail} />
            </div>
        </div>
    )
}
export default Student