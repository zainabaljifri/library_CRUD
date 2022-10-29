const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth"); // not activated yet
const {addUser} = require('../controllers/register')
const {login} = require('../controllers/login')

router.post('/register',addUser)
router.post('/login',login)

module.exports = router