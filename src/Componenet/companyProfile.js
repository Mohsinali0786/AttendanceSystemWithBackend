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
    console.log('dataFromLS Company Profile', dataFromLS)
    const [CompanyName, setCompanyName] = useState('')
    const [ContactNo, setContactNo] = useState('')
    const [Address, setAddress] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);

    const [isEdit, setIsEdit] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)


    const Navigate = useNavigate()
    const mystate = useSelector((state) => state)
    // console.log('mystateeeeeeeeeee', mystate.AllUsers?.Company)
    const currLoginUser = mystate?.AllUsers.LoginUser?.Email
    // console.log('currLoginUser', currLoginUser)
    const filterdata = mystate?.AllUsers?.Company.find((v) => v.Email === currLoginUser)
    // console.log('Ffffff', filterdata)
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
                // console.log('IsEmailExist===+++', IsEmailExist)
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
                                                    {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='CompanyName' required value={filterdata?.CompanyName} placeholder='CompanyName' />
                                                        {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                    </> :
                                                    <>
                                                        <input name='CompanyName' required value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='CompanyName' />
                                                        {/* <Button onClick={() => UpdateBtn()}> Update</Button> */}
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
                                                    {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='ContactNo' required value={filterdata?.ContactNo} placeholder='ContactNo' />
                                                        {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                    </> :
                                                    <>
                                                        <input name='ContactNo' required value={ContactNo} onChange={(e) => setContactNo(e.target.value)} placeholder='ContactNo' />
                                                        {/* <Button onClick={() => UpdateBtn()}> Update</Button> */}
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
                                                    {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Email' required value={filterdata?.Email} placeholder='Email' />
                                                        {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                    </> :
                                                    <>
                                                        <input name='Email' required value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                                                        {/* <Button onClick={() => UpdateBtn()}> Update</Button> */}
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
                                                    <input name='Address' required value={Address} placeholder='Address' />
                                                    {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Address' required value={filterdata?.Address} placeholder='Address' />
                                                        {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                    </> :
                                                    <>
                                                        <input name='Address' required value={Address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                                                        {/* <Button onClick={() => UpdateBtn()}> Update</Button> */}
                                                    </>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <p style={{ textAlign: 'left' }}>Password</p>

                                    <td className='iconswithinputs'><LockOpenIcon className='icons' />
                                        {/* <input name='Password' type={passwordShown ? "text" : "password"} value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' required />
                                        <EyeInvisibleTwoTone onClick={() => { togglePassword() }} className='VisibleIcon' /> */}

                                        {
                                            !isEdit && isUpdate ?
                                                <>
                                                    <input name='Password' type={passwordShown ? "text" : "password"} value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' required />
                                                    <EyeInvisibleTwoTone onClick={() => { togglePassword() }} className='VisibleIcon' />
                                                    {/* <Button onClick={() => EditBtn()}>Edit</Button> */}

                                                </> :

                                                !isEdit ?
                                                    <>
                                                        <input name='Password' required value={filterdata?.Password} placeholder='Password' />
                                                        {/* <Button onClick={() => EditBtn()}>Edit</Button> */}
                                                    </> :
                                                    <>
                                                        <input name='Password' required value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Address' />
                                                        {/* <Button onClick={() => UpdateBtn()}> Update</Button> */}
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
                                        {/* <Button variant='contained' className='loginBtn' onClick={() => checkEmailIsValid()}>Save</Button> */}
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