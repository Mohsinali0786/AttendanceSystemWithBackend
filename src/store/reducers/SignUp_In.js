import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// const Navigate = useNavigate()
const initialState = {

    Users: [],
    LoginUser: {},
    IsLoggedIn: null,
    // AllAttendancesUser:[{'Name':[]},{'Name':[]},{'Name':[]}]
    Attendance: []



}

const AllUsers = (state = initialState, action) => {

    // console.log('AllUsers State====>', state)

    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                Users: [...state.Users, action.payload],

            }
        case "LOGININ":
            console.log('state.AllUsers Reducer', state.Users)
            const data = action.payload
            const filtereddata = state.Users.find((i) => i.Email === data.Email && i.Password === data.Password)

            if (filtereddata) {
                Swal.fire({
                    icon: 'success',
                    text: 'Congratulation You Successfully Logged In!',

                })
                return {
                    ...state,
                    LoginUser: action.payload,
                    IsLoggedIn: true

                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Provide Correct Email or Password!',
                })

                return {
                    ...state,
                    message: "You Are Not Registered",
                    IsLoggedIn: false
                }
            }
        case "LOGOUT": {
            console.log('state.AllUsers Reducer LogOut', state.Users)

            return {
                ...state,
                IsLoggedIn: false,
                LoginUser: {},
            }
        }

        case "DELETE":
            {

                let filteredData = state.Users.filter((user) => user.id !== action.id)
                // console.log('filteredData====>', filteredData)

                return {
                    ...state,
                    Users: filteredData
                }
            }

        case "EDIT":
            {
                let updatedArr = []
                console.log('Edit in Reducer')
                let filteredData = state.Users.find((user) => user.id === action.payload.id)
                // console.log('filteredData Data in Edit====>', filteredData)
                // filteredData = {
                //     UserRole: action.payload.userRole,
                //     ...filteredData,
                // }
                console.log('After Edited====>', filteredData)
                state.Users.map((v) => {
                    if (v.id === action.payload.id) {

                        v.userRole = action.payload.userRole;
                        v.id = v.id;
                        v.FirstName = filteredData.FirstName;
                        v.LastName = filteredData.LastName;
                        v.Email = filteredData.Email;
                        v.Password = filteredData.Password;

                    }
                    updatedArr.push(v)
                })

                return {
                    ...state,
                    Users: updatedArr
                }

            }

        case "ADDDATE": {
            console.log('Add Date Function Running')
            console.log('state.Attendance', action.payload)
            return {
                ...state,
                Attendance: action.payload
            }
        }


        // case "ResetLogin": {
        //     return {
        //         ...state,
        //         message: '',
        //         // IsLoggedIn: null,
        //     }

        // }

        default: return state

    }
}

export default AllUsers

