import { useState } from "react"
// import { incNum, decNum } from '../store/actions/index'
import { useSelector, useDispatch } from "react-redux"
import Form from './SignInForm'
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
function DashBoard() {
    const [state, setstate] = useState(0)
    // const updatedState = useSelector((state) => console.log('Stattttttttttttttt', state.AllUsers))
    const dispatch = useDispatch()
    return (
        <div>
            {/* <div>
                <h1 style={{ textAlign: 'center', backgroundColor: 'rgb(131 181 166)', color: 'white' }}>Attendance Management System</h1>

            </div>
            <div>
                <h1 style={{ textAlign: 'center' }}>NO-CODE-AI</h1>
            </div> */}
            <div className="form-with-img">
                <div className="SignIn-Form">
                    <Form />
                </div>
                <div className="sideGradient">
                    <h2>New Here?</h2>
                    <p>Sign Up here if you have not any account?</p>
                    <Link to='/SignUpForm'><Button> Sign Up</Button></Link>
                    {/* <img id='signinform-img' src='https://www.asmag.com/upload/pic/case/61921.5381701.jpg' /> */}
                </div>
            </div>



            {/* <button onClick={() => dispatch(decNum())}>-</button>
            <input value={updatedState} />
            <button onClick={() => dispatch(incNum())}>+</button> */}
        </div >

    )
}
export default DashBoard