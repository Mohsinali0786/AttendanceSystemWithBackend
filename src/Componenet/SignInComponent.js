import { useState } from "react"
import Form from '../Screen/SignInForm'
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
function DashBoard() {

    const [handleLoginForm, sethandleLoginForm] = useState()
    // console.log('handleLoginForm === "Company"', handleLoginForm)

    return (
        <div>
            <div className="form-with-img">

                <div className="SignIn-Form">
                    <Form handleLoginForm={handleLoginForm} sethandleLoginForm={sethandleLoginForm} />
                </div>
                {
                    handleLoginForm === 'Company' ?
                        < div className="sideGradient">
                            <h2>New Here?</h2>
                            <p>Sign Up here if you have not any account?</p>
                            <Link to='/comapanysignup'><Button> Sign Up</Button></Link>
                        </div>
                        :
                        < div className="sideGradient">
                            <h2>Welcome !!</h2>
                            <p>Please Login if you are user or admin if Company then you can also SignUp </p>
                        </div>
                }
            </div>
        </div >
    )
}
export default DashBoard