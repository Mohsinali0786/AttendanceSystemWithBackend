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
    Attendance: []



}

const AllUsers = (state = initialState, action) => {


    switch (action.type) {

        case "REGISTER":
            let updatedArr = []
            let filteredData = state.Users.find((user) => user.Email === action.payload.Email)
            console.log('filteredData', filteredData)
            if (filteredData) {

                state.Users.map((v) => {

                    if (v.Email === action.payload.Email && v.isDeleted === true) {
                        console.log('Now If running', filteredData)
                        v.id = filteredData.id;
                        v.FirstName = filteredData.FirstName;
                        v.LastName = filteredData.LastName;
                        v.Email = filteredData.Email;
                        v.Password = filteredData.Password;
                        v.isDeleted = false

                        Swal.fire({
                            icon: 'success',
                            text: 'Congratulation You Successfully SignUp Please Login Now !',

                        })
                    }
                    updatedArr.push(v)
                    return {
                        ...state,
                        Users: updatedArr,

                    }
                })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    text: 'Congratulation You Successfully SignUp Please Login Now !',

                })

                return {
                    ...state,
                    Users: [...state.Users, action.payload],

                }
            }
        case "LOGININ":
            const data = action.payload
            const filtereddata = state.Users.find((i) => i.Email === data.Email && i.Password === data.Password)
            if (filtereddata) {
                if (!filtereddata.isDeleted) {

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
            }

        case "EDIT":
            {
                let updatedArr = []
                console.log('Edit in Reducer')
                console.log(action.payload)
                let filteredData = state.Users.find((user) => user.id === action.payload.id)
                state.Users.map((v) => {
                    if (v.id === action.payload.id) {

                        v.userRole = action.payload.userRole;
                        v.id = v.id;
                        v.FirstName = filteredData.FirstName;
                        v.LastName = filteredData.LastName;
                        v.Email = action.payload.Email;
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

