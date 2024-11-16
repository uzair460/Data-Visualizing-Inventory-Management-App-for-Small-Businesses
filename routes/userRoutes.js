const express = require('express')
const {registerControler, loginControler} = require('../controllers/userControler')

//router object
const router = express.Router()

//routes 
// register || POST
router.post('/register', registerControler)

//Login || POST
router.post('/login', loginControler)

//export 
module.exports = router