const User = require('../Model/userModel')

const registerUser = async (req, res) => {
    try {
        console.log('req.body for users', req.body)

        const { firstName, lastName, email, password, companyName, type, userRole, } = req.body
        const UserExist = await User.findOne({ email, companyName })
        console.log('UserExist=====>', UserExist)

        if (UserExist) {
            res.send({ status: 'error', message: 'This User is already registered' })
        }
        else {
            res.send({ status: 'success', message: 'Congratulations You added your user successfully' })
            const myUser = await User.create({
                // companyName,
                firstName,
                lastName,
                email,
                password,
                companyName,
                type,
                userRole,
            });

            if (myUser) {
                res.status(201).send('data saved successfully')
            }
            else {
                res.status(400)
                throw new Error('Error Occured')
            }
        }
        return res.send({ success: true })
    }
    catch (err) {

        console.log('err', err)
    }
}

const authUser = async (req, res) => {
    // console.log('-------------------', req.body)
    const { company, email, password } = req.body

    const userExist = await User.findOne({ email, company })
    console.log('UserExist=====>', userExist)


    if (userExist && await userExist.matchPassword(password)) {
        // if (userExist.companyName === company) {

        res.send({ status: 'success', message: 'Congratulation You Successfully Login !' })
        // }
        // else {
        //     res.send({
        //         status: 'error', message: 'This Email is not registered'
        //     })
        // }
    }
    else {
        res.send({ status: 'error', message: 'Wrong Email or Password' })
    }

}

const getAllUsers = async (req, res) => {
    const AllUsers = await User.find({})
    // console.log('AllUser', AllUsers)

    if (AllUsers) {
        // res.json(AllCompanies)
        res.send({ status: 'success', AllUsers })
        // res.json(AllCompanies)
    }
    else {
        res.send({
            message: "Error in data receiving"
        })
    }
}

const deleteUser = async (req, res) => {

    console.log('deleted inn', req.params)

    try {
        const deleted = await User.findById(req.params.id)
        console.log('===>', deleted)

        res.send({
            status: 'success',
            message: 'Your data deleted successfully'
        })
    }
    catch (err) {
        console.log('catch ===>', err)

        res.send({
            status: 'error',
            message: 'Error found'
        })
    }

}
module.exports = { registerUser, authUser, getAllUsers, deleteUser }