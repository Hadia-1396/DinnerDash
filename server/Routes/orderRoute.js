const express = require('express')
const Controllers = require('../Controllers/order')
const auth = require('../Middleware/auth')


const router = express.Router();

router.post('/',auth.validateToken, Controllers.AddOrder)
router.get('/:id',auth.validateToken, Controllers.GetOrder)
router.get('/all/:id',auth.validateToken, Controllers.GetDashboardOrder)
router.get('/getbyid/:id',auth.validateToken, Controllers.GetOrderById)
router.patch('/:id',auth.validateToken, Controllers.UpdateStatus)
module.exports = router