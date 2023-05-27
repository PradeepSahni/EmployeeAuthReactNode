const express = require('express')
const Router = express.Router()
const UserController = require('../controllers/UserController')
const initApiRoutes = (app)=>{
    Router.post('/createUser',UserController.createUser)
    Router.post('/login',UserController.login)
    return app.use('/api',Router)
}

module.exports = initApiRoutes