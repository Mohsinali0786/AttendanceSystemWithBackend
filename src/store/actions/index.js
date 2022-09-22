export const Sign_Up = (data) => async (dispatch, getState) => {
    console.log("SignU Data", data)
    dispatch({
        type: "REGISTER",
        payload: data
    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const CompanySign_Up = (data) => async (dispatch, getState) => {
    console.log("SignU Data", getState())
    dispatch({
        type: "REGISTERCOMPANY",
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
    console.log('Cell=====>', role)
    dispatch({
        type: 'EDIT',
        payload: { userRole: role, id: cell.row.id, Email: cell.row.email },

    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const editCompanyData = (data) => async (dispatch, getState) => {
    console.log('Updated Data=====>', data)
    dispatch({
        type: 'EDITCOMPANY',
        payload: data,

    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}
export const editUserData = (data) => async (dispatch, getState) => {
    console.log('Updated Data=====>', data)
    dispatch({
        type: 'EDITUSER',
        payload: data,

    })
    localStorage.setItem('Users', JSON.stringify(getState()))
}



