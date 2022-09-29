const express = require('express')
const { registerCompany, authCompany, getCompany } = require('../Controllers/companyControllers')
const { registerUser, authUser, getAllUsers, deleteUser, updateUser } = require('../Controllers/userController')
const { addAttendance, getAllAttendance } = require('../Controllers/attendanceController')



const routes = express.Router()

// routes.get('/getuser', getUser)
routes.post('/sigup', registerCompany)
routes.post('/registeruser', registerUser)

routes.post('/login', authCompany)
routes.post('/authuser', authUser)

routes.delete('/deleteusers/:id', deleteUser)
routes.put('/editusers/:id', updateUser)


routes.get('/getcompany', getCompany)
routes.get('/getusers', getAllUsers)


routes.post('/addattendance', addAttendance)
routes.get('/getattendance', getAllAttendance)



module.exports = routes
