import Swal from 'sweetalert2'

const initialState = {

    Users: [

    ],
    Company: [],
    LoginUser: {},
    IsLoggedIn: null,
    Attendance: []



}
const AllUsers = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER":
            console.log('Action .payload====>', action.payload)
            let updatedArr = []
            let filteredData = state.Users.find((user) => user.Email === action.payload.Email && user.CompanyName === action.payload.CompanyName)
            console.log('filteredData', filteredData)
            if (filteredData) {

                state.Users.map((v) => {

                    if (v.Email === action.payload.Email && v.isDeleted === true) {
                        console.log('Now If running')
                        v.id = filteredData.id;
                        v.FirstName = filteredData.FirstName;
                        v.LastName = filteredData.LastName;
                        v.Email = filteredData.Email;
                        v.Password = filteredData.Password;
                        v.isDeleted = false
                        v.userRole = 'user'

                        Swal.fire({
                            icon: 'success',
                            text: 'Congratulation You Successfully Added!',

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
                    text: 'Congratulation You Successfully Added!',

                })

                return {
                    ...state,
                    Users: [...state.Users, action.payload],

                }
            }
            return state
        case "REGISTERCOMPANY":

            console.log('REGISTERCOMPANY')
            // let MyupdatedArr = []
            // console.log('state in RegCom action.payload===>', action.payload)
            // console.log('state in RegCom==>', AllUsers)
            // let MyfilteredData = state?.Company.find((user) => user.Email === action.payload.Email)
            // console.log('filteredData', MyfilteredData)
            // if (filteredData) {

            //     state.Company.map((v) => {

            //         if (v.Email === action.payload.Email && v.isDeleted === true) {
            //             console.log('Now If running', filteredData)
            //             v.id = MyfilteredData.id;
            //             v.CompanyName = MyfilteredData.CompanyName;
            //             v.ContactNo = MyfilteredData.ContactNo;
            //             v.Email = MyfilteredData.Email;
            //             v.Password = MyfilteredData.Password;
            //             v.Address = MyfilteredData.Address;
            //             v.isDeleted = false

            //             Swal.fire({
            //                 icon: 'success',
            //                 text: 'Congratulation You Successfully SignUp Please Login Now !',

            //             })
            //         }
            //         MyupdatedArr.push(v)
            //         return {
            //             ...state,
            //             Company: MyupdatedArr,

            //         }
            //     })
            // }
            // else {
            //     Swal.fire({
            //         icon: 'success',
            //         text: 'Congratulation You Successfully SignUp Please Login Now !',

            //     })
            Swal.fire({
                icon: 'success',
                text: 'Congratulation You Successfully SignUp Please Login Now !',

            })
            return {
                ...state,
                Company: [...state.Company, action.payload],

            }
        // }

        case "LOGININ":
            var filtereddata = ''
            const data = action.payload
            console.log('data reducer', data)
            if (data.type === 'company') {

                filtereddata = state.Company.find((i) => i.Email === data.Email && i.Password === data.Password && i.type === data.type)
                // console.log('Companyfiltereddata====>', state)

            }
            else {

                filtereddata = state.Users.find((i) => i.Email === data.Email && i.Password === data.Password && i.type === data.type && data.Company === i.CompanyName)
                console.log('Userfiltereddata====>', data.Company)


            }

            if (filtereddata) {
                if (!filtereddata.isDeleted) {

                    return {
                        ...state,
                        LoginUser: action.payload,
                        IsLoggedIn: true

                    }
                } else {
                    // console.log('ELse RRRRR')

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This Email is not registered Please SignUp first then try again!',
                    })

                    return {
                        ...state,
                        message: "You Are Not Registered",
                        IsLoggedIn: false
                    }
                }
            }
            else {
                // console.log('ELse RRRRR')
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Provide Correct Email or Password!',
                })

            }
        case "LOGOUT": {
            // console.log('state.AllUsers Reducer LogOut', state.Users)

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
                        // console.log('action.payload.userRole', action.payload.userRole)
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
                // console.log('Edit in Reducer')
                // console.log(action.payload)
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


        case "EDITCOMPANY":
            {
                let updatedArr = []
                console.log('action.payload', action.payload)
                // let filteredData = state.Users.find((user) => user.id === action.payload.id)
                state.Company.map((v) => {
                    if (v.id === action.payload.id) {

                        console.log('Edit in Reducer')
                        v.userRole = action.payload.userRole;
                        v.CompanyName = action.payload.CompanyName;
                        v.id = v.id;
                        v.Email = action.payload.Email;
                        v.ContactNo = action.payload.ContactNo;
                        v.Address = action.payload.Address;
                        v.Password = action.payload.Password;

                    }
                    updatedArr.push(v)
                })

                return {
                    ...state,
                    Company: updatedArr
                }

            }

        case "EDITUSER":
            {
                let updatedArr = []
                console.log('action.payload', action.payload)
                let filteredData = state.Users.find((user) => user.id === action.payload.id)
                state.Users.map((v) => {
                    if (v.id === action.payload.id) {

                        // console.log('Edit in Reducer')
                        v.userRole = action.payload.userRole;
                        v.FirstName = action.payload.FirstName;
                        v.LastName = action.payload.LastName;
                        v.id = v.id;
                        v.Email = action.payload.Email;
                        v.Password = action.payload.Password;

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

