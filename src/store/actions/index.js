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

export const Sign_Up = (data) => {
    console.log("Signing Running")

    return (dispatch) => {
        dispatch({
            type: "REGISTER",
            payload: data
        })
    }


}