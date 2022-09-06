import Swal from 'sweetalert2'

const initialState = {

    Users: [
        // {
        //     Email: "mohsin@gmail.com",
        //     FirstName: "Mohsin",
        //     LastName: "Ali",
        //     Password: "12345",
        //     id: '0000',
        //     isDeleted: false,
        //     userRole: "admin",
        // }
    ],
    LoginUser: {},
    IsLoggedIn: null,
    // AllAttendancesUser:[{'Name':[]},{'Name':[]},{'Name':[]}]
    Attendance: []



}

const AllUsers = (state = initialState, action) => {

    // console.log('AllUsers State====>', state)

    switch (action.type) {


        case "REGISTER":
            Swal.fire({
                icon: 'success',
                text: 'Congratulation You Successfully SignUp Please Login Now !',

            })
            return {
                ...state,
                Users: [...state.Users, action.payload],

            }
        case "LOGININ":
            // console.log('state.AllUsers Reducer', state.Users)
            const data = action.payload
            const filtereddata = state.Users.find((i) => i.Email === data.Email && i.Password === data.Password)
            // console.log('Filtered data reducer', filtereddata)
            if (filtereddata) {
                if (!filtereddata.isDeleted) {
                    // console.log('filtereddata in Reducer')

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
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Provide Correct Email or Password!',
                })

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
                let updatedArr = []
                // console.log('Edit in Reducer')
                let filteredData = state.Users.find((user) => user.id === action.payload.id)

                state.Users.map((v) => {
                    if (v.id === action.payload.id) {
                        console.log('action.payload.userRole', action.payload.userRole)
                        if (v.userRole === 'admin') {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Admins are not deletable !',
                            })
                            v.id = v.id;
                            v.FirstName = filteredData.FirstName;
                            v.LastName = filteredData.LastName;
                            v.Email = filteredData.Email;
                            v.Password = filteredData.Password;
                            v.isDeleted = false

                        }
                        else {
                            v.userRole = action.payload.userRole;
                            v.id = v.id;
                            v.FirstName = filteredData.FirstName;
                            v.LastName = filteredData.LastName;
                            v.Email = filteredData.Email;
                            v.Password = filteredData.Password;
                            v.isDeleted = action.payload.isDeleted
                        }


                    }
                    updatedArr.push(v)
                })

                return {
                    ...state,
                    Users: updatedArr
                }





                // For deleted from redux+localstorage

                // let filteredData = state.Users.filter((user) => user.id !== action.id)
                // console.log('filteredData====>', filteredData)
                // return {
                //     ...state,
                //     Users: filteredData
                // }
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
                // console.log('After Edited====>', filteredData)
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
            // console.log('Add Date Function Running')
            // console.log('state.Attendance', action.payload)
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

