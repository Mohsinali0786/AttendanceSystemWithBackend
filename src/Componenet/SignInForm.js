// import { FormControl, Input, InputLabel } from '@mui/material';
import { Button } from '@mui/material';
import UserIcon from '../Assets/Images/UserIcons.png'
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';


function SignInForm() {


    return (
        <form className='mainForm'>
            
            <div className='UserIconDiv'>

                <img src={UserIcon} id='usericon-img' />
            </div>
            <table className='tablestyling'>
                <tr>
                    <td className='iconswithinputs'><EmailIcon className='icons' /><input placeholder='Email' /></td>
                </tr>
                <tr>
                    <td className='iconswithinputs'><LockOpenIcon className='icons' /><input placeholder='Passowrd' /></td>
                </tr>
                <tr>
                    <td colSpan={2} style={{ textAlign: 'center', padding: '30px 0px 20px 0px' }}>
                        <Button variant='contained' className='loginBtn'>Login</Button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={10}><h4>New Registration? <Link to='/SignUpForm'>Click Here</Link></h4></td>
                    {/* <td colSpan={10}><h4>New Registration? <Button onClick={() => Navigate('/SignUpForm')}> Click Here</Button></h4></td> */}

                </tr>
            </table>

        </form >

    )
}
export default SignInForm;
