
// import store from '../../store'
// export const incNum = () => {
//     return {
//         type: "INCREMENT"
//     }
// }
// export const decNum = () => {
//     return {
//         type: "DECREMENT"
//     }


// }

export const Sign_Up = (data) => async (dispatch, getState) => {

    dispatch({
        type: "REGISTER",
        payload: data
    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const Sign_In = (LoginInfo) => async (dispatch) => {
    dispatch({
        type: 'LOGININ',
        payload: LoginInfo,
    })
}
export const signOut = () => async (dispatch) => {
    console.log('Run')
    dispatch({
        type: 'LOGOUT',
    })
}

export const deleteData = (e, cell) => async (dispatch, getState) => {
    dispatch({
        type: 'DELETE',
        id: cell.row.id
    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const editData = (cell, role) => async (dispatch, getState) => {
    dispatch({
        type: 'EDIT',
        payload: { userRole: role, id: cell.row.id },

    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}


