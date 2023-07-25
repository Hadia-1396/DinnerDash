const express = require('express')
const Controllers = require('../Controllers/user')

const router = express.Router();

router.post('/signup', Controllers.AddUser)
router.post('/signin', Controllers.GetUser)
module.exports = router