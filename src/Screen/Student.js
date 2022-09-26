import { signOut } from '../store/actions'
import { useSelector, useDispatch } from "react-redux"
import { Button } from '@mui/material'
import AllStudentTable from '../Componenet/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


function Student() {
    // let UserEmail;
    const [UserEmail, setUserEmail] = useState()
    const [adminRole, setAdminRole] = useState(false)
    const [AllAttendance, setAllAttendance] = useState()

    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers)

    // console.log('mystate in Student', mystate)

    let IsLoggedIn = mystate?.LoginUser?.IsLoggedIn
    // console.log('IsLoggedIn in student', IsLoggedIn)

    let filteruser;
    let UserName;
    if (mystate?.LoginUser?.type === 'company') {

        filteruser = mystate.Company.find((v) => v.email === UserEmail)
        // console.log('IsLoggedIn in student', filteruser)
        UserName = filteruser?.companyName
    }
    else {
        // console.log('mystate.LoginUser=====', mystate.LoginUser.LoginUser.company)

        filteruser = mystate.Users.find((v) => v.email === UserEmail && v.companyName === mystate.LoginUser?.LoginUser?.company)
        // console.log('filterUser in student=====', filteruser)
        UserName = filteruser?.firstName + " " + filteruser?.lastName
        console.log('UserName in UserName=====', UserName)

    }
    // useEffect(() => {
    //     let DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
    //     setAllAttendance(DataFromLS)
    // }, [])
    useEffect(() => {
        setUserEmail(mystate?.LoginUser?.LoginUser?.email)
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
    const MyState = useSelector((state) => state)
    const mystate1 = useSelector((state) => state)
    const currLoginUser = mystate1?.AllUsers?.LoginUser
    // console.log('currLoginUser', currLoginUser)
    // const filterdata = mystate1?.AllUsers?.Users.find((v) => v.Email === currLoginUser?.Email)
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const mydate = new Date()
    let DataFromLS = []
    let C_Date = JSON.parse(localStorage.getItem("Attedance"))
    // console.log('C_Date===>', C_Date)

    let C_User = useSelector((state) => state.AllUsers)
    // console.log('C_User===>', C_User)

    useEffect(() => {
        // console.log('Use Effect GetData From LS')
        GetDataFromLS()
    }, [])



    useEffect(() => {
        setAddDateClicked(false)
        if (data.length !== 0) {
            localStorage.setItem('Attedance', JSON.stringify(data))
        }
    }, [addDateClicked === true])

    const GetDataFromLS = () => {
        if (localStorage.getItem("Attedance") !== null) {
            DataFromLS = JSON.parse(localStorage.getItem("Attedance"))
            setData(DataFromLS)
        }
    }
    const AddDate = () => {

        // console.log('C_User', C_User.Users)


        const CurrDate = mydate.getDate() + "-" + Month[(mydate.getMonth())] + "-" + mydate.getFullYear()
        const CurrTime = mydate.getHours() + ":" + mydate.getMinutes() + ":" + mydate.getSeconds()
        if (C_Date !== null) {
            let filterEmail = C_Date?.filter((mydata) => mydata.Email === C_User.LoginUser.Email && mydata.CompanyName === C_User.LoginUser.Company)

            let findCurrDate = filterEmail.find((isCurrDate) => isCurrDate.CurrDate === CurrDate)
            // console.log('findCurrDate', findCurrDate)
            if (filterEmail.length !== 0) {
                if (!findCurrDate) {
                    setAddDateClicked(true)
                    let CurrDay = mydate.getDay()
                    CurrDay = weekday[CurrDay]
                    setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: UserEmail, CompanyName: C_User.LoginUser.Company }])
                    dispatch({
                        type: "ADDDATE",
                        payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser.Company }]
                    })
                    localStorage.setItem('Attedance', JSON.stringify(data))

                }
            }
            else {
                // console.log('ELse running')
                setAddDateClicked(true)
                let CurrDay = mydate.getDay()
                CurrDay = weekday[CurrDay]
                setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: UserEmail, CompanyName: C_User.LoginUser.Company }])
                dispatch({
                    type: "ADDDATE",
                    payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser.Company }]
                })
                localStorage.setItem('Attedance', JSON.stringify(data))
            }
        }
        else {
            setAddDateClicked(true)
            let CurrDay = mydate.getDay()
            CurrDay = weekday[CurrDay]
            setData([...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', Email: UserEmail, CompanyName: C_User.LoginUser?.Company }])
            dispatch({
                type: "ADDDATE",
                payload: [...data, { CurrDate: CurrDate, CurrTime: CurrTime, CurrDay: CurrDay, Status: 'Present', CompanyName: C_User.LoginUser?.Company }]
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
                    <LogoutIcon style={{ cursor: 'pointer', color: 'white', fontSize: '25px', marginRight: '20px' }} onClick={() => dispatch(signOut())} />

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