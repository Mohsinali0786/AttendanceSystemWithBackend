// import { FormControl, Input, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import UserIcon from '../Assets/Images/UserIcons.png'
import CompanyIcon from '../Assets/Images/companyicon.png'
import { Link, Navigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector, useDispatch } from "react-redux"
import { Sign_In } from '../store/actions/index'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleTwoTone } from '@ant-design/icons'
import Swal from 'sweetalert2';

function SignInForm({ handleLoginForm, sethandleLoginForm }) {
    const Navigate = useNavigate()
    const dispatch = useDispatch()


    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [IsLogin, setIsLogin] = useState(false)
    const [isCondition, setIsCondition] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    // const [handleLoginForm, sethandleLoginForm] = useState()


    const mystate = useSelector((state) => state.AllUsers)
    // console.log('My state===>', mystate)
    let IsLoggedIn = mystate.IsLoggedIn
    var isfirst = true

    let loginInfo = {
        Email,
        Password,
    }


    // console.log('isfirstisfirst', isfirst)
    useEffect(() => {
        // console.log('IsLoggedIn', IsLoggedIn)

        if (IsLoggedIn) {
            mystate.Users.map((v, index) => {
                // console.log('v.Email === ', v.Email)

                // console.log('v.Email === mystate.LoginUser', mystate.LoginUser)
                // console.log('!v.isDeleted', !v.isDeleted)

                if (v.Email === mystate.LoginUser.Email) {
                    console.log('Outer If')

                    if (!v.isDeleted) {

                        Swal.fire({
                            icon: 'success',
                            text: 'Congratulation You Successfully Logged In!',

                        })
                        Navigate('/Home')
                    }
                }

            })
        }
    }, [IsLoggedIn === true])



    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form className='mainForm'>
            <div className='User-Company-btn-div'>

                <Button className='UserLogin-btn' value='User' onClick={(e) => { sethandleLoginForm(e.target.value) }}>User</Button>
                <Button className='CompanyLogin-btn' value='Company' onClick={(e) => { sethandleLoginForm(e.target.value) }}>Company</Button>
            </div>
            {
                handleLoginForm === 'Company' ?

                    <h2>Company Login</h2>
                    :
                    <h2>User Login</h2>

            }

            <table className='tablestyling'>
                {
                    handleLoginForm === 'Company' ?
                        <div className='UserIconDiv'>

                            <img src={CompanyIcon} id='usericon-img' />
                        </div>
                        :
                        <div className='UserIconDiv'>

                            <img src={UserIcon} id='usericon-img' />
                        </div>
                }
                <tr>

                    <td className='iconswithinputs'><EmailIcon className='icons' /><input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /></td>
                </tr>
                <tr >

                    <td className='iconswithinputs'><LockOpenIcon className='icons' />
                        <input type={passwordShown ? "text" : "password"} onChange={(e) => { setPassword(e.target.value) }} placeholder='Passoword' />
                        <EyeInvisibleTwoTone onClick={() => { togglePassword() }} className='VisibleIcon' />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                        <Button variant='contained' className='loginBtn' onClick={() => dispatch(Sign_In(loginInfo))}>Login</Button>
                    </td>

                </tr>
                {
                    handleLoginForm === 'Company' ?
                        < tr id='signUp-mobile'>
                            <td colSpan={10}><p>New Registration? <Link to='/comapanysignup'><b></b>Click Here</Link></p></td>
                        </tr>
                        :
                        ""
                }
            </table>


        </form >

    )
}
export default SignInForm;
