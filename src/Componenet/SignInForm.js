// import { FormControl, Input, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import UserIcon from '../Assets/Images/UserIcons.png'
import { Link, Navigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector, useDispatch } from "react-redux"
import { Sign_In } from '../store/actions/index'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleTwoTone } from '@ant-design/icons'

import { Input, Space } from 'antd';




function SignInForm() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()


    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [IsLogin, setIsLogin] = useState(false)
    const [isCondition, setIsCondition] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);

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
            // Navigate('/Student')
            Navigate('/Home')

        }
    }, [IsLoggedIn === true])


    // let conditionalUser = () => {

    //     if (isCondition) {
    //         setIsCondition(false)
    //         console.log('running')
    //     } else {
    //         console.log('running1')

    //         setIsCondition(true)
    //     }
    // }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <form className='mainForm'>
            <h2>Login To Your Account</h2>

            <table className='tablestyling'>
                <div className='UserIconDiv'>

                    <img src={UserIcon} id='usericon-img' />
                </div>
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
                <tr id='signUp-mobile'>
                    <td colSpan={10}><p>New Registration? <Link to='/SignUpForm'><b></b>Click Here</Link></p></td>
                </tr>
            </table>

        </form >

    )
}
export default SignInForm;
