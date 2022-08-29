const initialState = {

    Users: [
        {
            id: 1,
            FirstName: 'Ali',
            LastName: 'Hassan',
            Email: 'ali@gmail.com',
            Password: '12345'
        },
        {
            id: 2,
            FirstName: 'Kashif',
            LastName: 'Ahmed',
            Email: 'kashi@gmail.com',
            Password: '56789'
        },
        {
            id: 3,
            FirstName: 'Bilal',
            LastName: 'Jawad',
            Email: 'bilo@gmail.com',
            Password: '12345'
        }
    ],
}

const AllUsers = (state = initialState, action) => {

    console.log('AllUsers State====>', state)

    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                Users: [...state.Users, action.payload]
            }
        default: return state

    }
}
export default AllUsers;