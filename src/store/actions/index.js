export const Sign_Up = (data) => async (dispatch, getState) => {
    // console.log("SignU Data", data)
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

export const deleteData = (cell, role) => async (dispatch, getState) => {
    dispatch({
        type: 'DELETE',
        payload: { userRole: role, id: cell.row.id, isDeleted: true },
    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const editData = (cell, role) => async (dispatch, getState) => {
    console.log('Cell=====>', cell)
    dispatch({
        type: 'EDIT',
        payload: { userRole: role, id: cell.row.id, Email: cell.row.email },

    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}


