import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up, editUserData } from '../store/actions/index'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { EyeInvisibleTwoTone } from '@ant-design/icons'
function UserProfile() {

    let dataFromLS = JSON.parse(localStorage.getItem('Users'))
    dataFromLS = dataFromLS.AllUsers.Company
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Address, setAddress] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const Navigate = useNavigate()
    const mystate = useSelector((state) => state)
    const currLoginUser = mystate?.AllUsers.LoginUser?.Email
    const filterdata = mystate?.AllUsers?.Users.find((v) => v.Email === currLoginUser)
    const dispatch = useDispatch()
    let data = {
        id: filterdata?.id,
        FirstName,
        LastName,
        Address,
        Email,
        Password,
        type: 'user',
        userRole: filterdata?.userRole

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

                }
                else {
                    dispatch(editUserData(data))

                }
            }
        }
        dispatch(editUserData(data))

    }
    function IsEmailPresent() {
        if (localStorage.getItem('Users') !== null) {

            let UserFromLS = JSON.parse(localStorage.getItem('Users'))
            let MyUserFromLS = UserFromLS.AllUsers.Users
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
                                    <p style={{ textAlign: 'left' }}>First Name</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='FirstName' required value={FirstName} placeholder='FirstName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='FirstName' required value={filterdata?.FirstName} placeholder='FirstName' />
                                                    </> :
                                                    <>
                                                        <input name='FirstName' required value={FirstName} onChange={(e) => setFirstName(e.target.value)} placeholder='FirstName' />
                                                    </>
                                        }
                                    </td>

                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>LastName</p>
                                    <td className='iconswithinputs'>
                                        <PersonIcon className='icons' />
                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='LastName' required value={LastName} placeholder='LastName' />
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='LastName' required value={filterdata?.LastName} placeholder='LastName' />
                                                    </> :
                                                    <>
                                                        <input name='LastName' required value={LastName} onChange={(e) => setLastName(e.target.value)} placeholder='LastName' />
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
                                                        <input name='Password' required value={Password} type={passwordShown ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder='Address' />
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
export default UserProfile