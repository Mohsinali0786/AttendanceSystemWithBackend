import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up, editCompanyData } from '../store/actions/index'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { EyeInvisibleTwoTone } from '@ant-design/icons'
function CompanyProfile() {

    let dataFromLS = JSON.parse(localStorage.getItem('Users'))
    dataFromLS = dataFromLS.AllUsers.Company
    // console.log('dataFromLS Company Profile', dataFromLS)
    const [CompanyName, setCompanyName] = useState('')
    const [ContactNo, setContactNo] = useState('')
    const [Address, setAddress] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const mystate = useSelector((state) => state)
    const currLoginUser = mystate?.AllUsers.LoginUser?.Email
    const filterdata = mystate?.AllUsers?.Company.find((v) => v.Email === currLoginUser)
    const dispatch = useDispatch()
    let data = {
        id: filterdata?.id,
        CompanyName,
        ContactNo,
        Address,
        Email,
        Password,
        type: 'company',
        userRole: 'admin'
    }
    const EditBtn = () => {
        setIsEdit(true)
    }
    const UpdateBtn = () => {
        setIsEdit(false)
        setIsUpdate(true)
        checkEmailIsValid()
    }
    const checkEmailIsValid = () => {
        if (localStorage.getItem('Users') !== null) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/;
            if (mailformat.test(Email)) {
                let IsEmailExist = IsEmailPresent()
                if (IsEmailExist) {

                    // if (IsEmailExist.isDeleted) {
                    //     dispatch(Sign_Up(data))
                    //     Navigate('/')
                    // }
                    // else {
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: 'Oops...',
                    //         text: 'This Email address is already Register Try different email ',
                    //     })
                    // }
                }
                else {
                    dispatch(editCompanyData(data))
                    // Navigate('/')

                }
            }
        }
        // else {

        dispatch(editCompanyData(data))
        //     Navigate('/')
        // }
    }
    function IsEmailPresent() {
        if (localStorage.getItem('Users') !== null) {
            let UserFromLS = JSON.parse(localStorage.getItem('Users'))
            let MyUserFromLS = UserFromLS.AllUsers.Company
            let IsEmailExist = MyUserFromLS.find((email) => email.Email === Email)
            return IsEmailExist
        }
    }
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }
    return (

        <div>
            <div >
                <div>
                    <h1 style={{ textAlign: 'center', backgroundColor: 'rgb(131 181 166)', color: 'white' }}>Attendance Management System</h1>
                </div>
                <h2 className='UserProfile'>User Profile</h2>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                    <div className='Editform-company-prof'>
                        <form className='signUpForm'>
                            <div className='UserIconDiv'>
                            </div>
                            <table className='tablestyling'>
                                <tr >
                                    <p style={{ textAlign: 'left' }}>Company Name</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='CompanyName' required value={CompanyName} placeholder='CompanyName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='CompanyName' required value={filterdata?.CompanyName} placeholder='CompanyName' />
                                                    </> :
                                                    <>
                                                        <input name='CompanyName' required value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='CompanyName' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Conatact Number</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='ContactNo' required value={ContactNo} placeholder='ContactNo' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='ContactNo' required value={filterdata?.ContactNo} placeholder='ContactNo' />
                                                    </> :
                                                    <>
                                                        <input name='ContactNo' required value={ContactNo} onChange={(e) => setContactNo(e.target.value)} placeholder='ContactNo' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Email</p>
                                    <td className='iconswithinputs'>
                                        <EmailIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='Email' required value={Email} placeholder='Email' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Email' required value={filterdata?.Email} placeholder='Email' />
                                                    </> :
                                                    <>
                                                        <input name='Email' required value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Address</p>
                                    <td className='iconswithinputs'>
                                        <EmailIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='Address' required value={Address} placeholder='Address' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Address' required value={filterdata?.Address} placeholder='Address' />
                                                    </> :
                                                    <>
                                                        <input name='Address' required value={Address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Password</p>

                                    <td className='iconswithinputs'><LockOpenIcon className='icons' />

                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='Password' type={passwordShown ? "text" : "password"} value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' required />
                                                    <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />

                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Password' type={passwordShown ? "text" : "password"} required value={filterdata?.Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
                                                        <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    </> :
                                                    <>
                                                        <input name='Password' type={passwordShown ? "text" : "password"} required value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Address' />
                                                        <EyeInvisibleTwoTone style={{ position: 'relative', left: '-20px' }} onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    </>
                                        }

                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                                        {
                                            !isEdit && isUpdate ?
                                                <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button>
                                                :
                                                !isEdit ?
                                                    <Button variant='contained' className='loginBtn' onClick={() => EditBtn()}>Edit</Button> :

                                                    < Button variant='contained' className='loginBtn' onClick={() => UpdateBtn()}> Update</Button>
                                        }
                                    </td>
                                </tr>

                            </table>
                        </form >
                    </div>
                </div>
            </div >

        </div >

    )
}
export default CompanyProfile