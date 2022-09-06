import { useState } from "react"
import Form from './SignInForm'
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
function DashBoard() {
    return (
        <div>
            <div className="form-with-img">
                <div className="SignIn-Form">
                    <Form />
                </div>
                <div className="sideGradient">
                    <h2>New Here?</h2>
                    <p>Sign Up here if you have not any account?</p>
                    <Link to='/SignUpForm'><Button> Sign Up</Button></Link>
                </div>
            </div>
        </div >
    )
}
export default DashBoard