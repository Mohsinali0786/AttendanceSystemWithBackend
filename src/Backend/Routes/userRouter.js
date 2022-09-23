const express = require('express')
const { registerCompany, authCompany } = require('../Controllers/userControllers')

const routes = express.Router()

// routes.get('/getuser', getUser)
routes.post('/sigup', registerCompany)
routes.post('/login', authCompany)

module.exports = routes
