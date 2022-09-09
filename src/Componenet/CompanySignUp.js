import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import formimg from '../Assets/Images/draw1.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up, CompanySign_Up } from '../store/actions/index'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { EyeInvisibleTwoTone } from '@ant-design/icons'



function CompanySignUpForm() {
    const [CompanyName, setCompanyName] = useState('')
    const [ContactNo, setContactNo] = useState('')
    const [Address, setAddress] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);

    const Navigate = useNavigate()
    const mystate = useSelector((state) => state.AllUsers.Company)
    const dispatch = useDispatch()
    // let mylength = mystate.length
    let data = {
        id: Math.round((Math.random()) * 1000),
        CompanyName,
        ContactNo,
        Address,
        Email,
        Password,
        type: 'company',
        userRole: 'admin'

    }
    const checkEmailIsValid = () => {
        if (localStorage.getItem('Users') !== null) {

            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (mailformat.test(Email)) {
                let IsEmailExist = IsEmailPresent()
                // console.log('IsEmailExist===+++', IsEmailExist)
                if (IsEmailExist) {

                    if (IsEmailExist.isDeleted) {
                        dispatch(CompanySign_Up(data))
                        Navigate('/')
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'This Email address is already Register Try different email ',
                        })
                    }
                }
                else {
                    dispatch(CompanySign_Up(data))
                    Navigate('/')

                }
            }
        }
        else {

            dispatch(CompanySign_Up(data))
            Navigate('/')
        }
    }
    function IsEmailPresent() {
        if (localStorage.getItem('Company') !== null) {

            let UserFromLS = JSON.parse(localStorage.getItem('Users'))
            let MyUserFromLS = UserFromLS.AllUsers.Company



            let IsEmailExist = MyUserFromLS.find((email) => email.Email === Email)
            return IsEmailExist

            // console.log(IsEmailExist.Email)
        }
    }
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div >
            <div>
                <h1 style={{ textAlign: 'center', backgroundColor: 'rgb(131 181 166)', color: 'white' }}>Attendance Management System</h1>

            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>


                <div className='SignUpForm-MainDiv'>
                    <h3>Company SignUp</h3>
                    <p>Please fill form to create account</p>
                    <form className='signUpForm'>
                        <div className='UserIconDiv'>
                        </div>
                        <table className='tablestyling'>
                            <tr >
                                <td className='iconswithinputs'><PersonIcon className='icons' /><input name='CompanyName' required value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='CompanyName' /></td>
                            </tr>
                            <tr>
                                <td className='iconswithinputs'><PersonIcon className='icons' /><input name='ContactNo' required value={ContactNo} onChange={(e) => setContactNo(e.target.value)} placeholder='ContactNo' /></td>

                            </tr>
                            <tr>
                                <td className='iconswithinputs'><EmailIcon className='icons' /><input name='Address' required value={Address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' /></td>
                            </tr>
                            <tr>
                                <td className='iconswithinputs'><EmailIcon className='icons' /><input name='Email' type='email' required value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /></td>
                            </tr>
                            <tr>
                                <td className='iconswithinputs'><LockOpenIcon className='icons' />
                                    <input name='Password' type={passwordShown ? "text" : "password"} value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' required />
                                    <EyeInvisibleTwoTone onClick={() => { togglePassword() }} className='VisibleIcon' />
                                </td>
                                {/* <td className='iconswithinputs'><LockOpenIcon className='icons' /><input name='Password' type='password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Passowrd' /></td> */}
                            </tr>

                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                                    <Button variant='contained' className='loginBtn' onClick={() => checkEmailIsValid()}>SignUp</Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={10}><p>Already Have Account For Log-In ? <Link to='/'><b>Click Here</b></Link></p></td>
                            </tr>
                        </table>
                    </form >
                </div>
                <img src={formimg} className='img-in-signup' />
            </div>
        </div >
    )
}
export default CompanySignUpForm;
