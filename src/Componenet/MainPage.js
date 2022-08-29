import { useState } from "react"
import { incNum, decNum } from '../store/actions/index'
import { useSelector, useDispatch } from "react-redux"
import Form from './SignInForm'
function DashBoard() {
    const [state, setstate] = useState(0)
    const updatedState = useSelector((state) => console.log('Stattttttttttttttt', state.AllUsers))
    const dispatch = useDispatch()
    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center', backgroundColor: 'green', color: 'white' }}>Attendance Management System</h1>

            </div>
            <div>
                <h1 style={{ textAlign: 'center' }}>NO-CODE-AI</h1>
            </div>
            <div className="form-with-img">
                <div>
                    <img src='https://www.asmag.com/upload/pic/case/61921.5381701.jpg' />
                </div>
                <div className="SignIn-Form">
                    <Form />

                </div>
            </div>



            {/* <button onClick={() => dispatch(decNum())}>-</button>
            <input value={updatedState} />
            <button onClick={() => dispatch(incNum())}>+</button> */}
        </div >

    )
}
export default DashBoard