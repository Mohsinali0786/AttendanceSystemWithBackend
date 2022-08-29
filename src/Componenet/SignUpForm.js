// import { FormControl, Input, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import UserIcon from '../Assets/Images/UserIcons.png'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import formimg from '../Assets/Images/draw1.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Sign_Up } from '../store/actions/index'

function SignUpForm() {
    const mystate = useSelector((state) => state.AllUsers.Users)
    let mylength = mystate.length
    console.log('My Len in state', mystate)
    const dispatch = useDispatch()
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    let data = {
        id: mylength + 1,
        FirstName,
        LastName,
        Email,
        Password,

    }

    return (
        <div >
            <div>
                <h1 style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>Attendance Management System</h1>

            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>


                <div className='SignUpForm-MainDiv'>
                    <h1 >SignUp</h1>
                    <h4>Please fill form to create account</h4>
                    <form className='signUpForm'>
                        <div className='UserIconDiv'>
                        </div>
                        <table className='tablestyling'>
                            <tr >
                                <td className='iconswithinputs'><PersonIcon className='icons' /><input name='FirstName' value={FirstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' /></td>
                            </tr>
                            <tr>
                                <td className='iconswithinputs'><PersonIcon className='icons' /><input name='LastName' value={LastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' /></td>

                            </tr>
                            <tr>
                                <td className='iconswithinputs'><EmailIcon className='icons' /><input name='Email' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' /></td>
                            </tr>
                            <tr>
                                <td className='iconswithinputs'><LockOpenIcon className='icons' /><input name='Password' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='Passowrd' /></td>
                            </tr>

                            <tr>
                                <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                                    <Button variant='contained' className='loginBtn' onClick={() => dispatch(Sign_Up(data))}>SignUp</Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={10}><h4>Already Have Account For Log-In ? <Link to='/'>Click Here</Link></h4></td>

                            </tr>


                        </table>

                    </form >

                </div>
                <img src={formimg} className='img-in-signup' />


            </div>

        </div >


    )
}
export default SignUpForm;
