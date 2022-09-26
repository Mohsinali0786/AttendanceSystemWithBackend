const express = require('express')
const { registerCompany, authCompany, getCompany } = require('../Controllers/companyControllers')
const { registerUser, authUser, getAllUsers } = require('../Controllers/userController')


const routes = express.Router()

// routes.get('/getuser', getUser)
routes.post('/sigup', registerCompany)
routes.post('/login', authCompany)
routes.post('/registeruser', registerUser)
routes.post('/authuser', authUser)

routes.get('/getcompany', getCompany)
routes.get('/getusers', getAllUsers)




module.exports = routes
