const express = require('express')
const Controllers = require('../Controllers/user')

const router = express.Router();

router.post('/signup', Controllers.Signup)
router.post('/signin/:role', Controllers.Login)
module.exports = router