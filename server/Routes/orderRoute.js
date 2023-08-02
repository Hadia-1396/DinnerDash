const express = require('express')
const Controllers = require('../Controllers/order')
const auth = require('../Middleware/auth')


const router = express.Router();

router.post('/addorder',auth.validateToken, Controllers.AddOrder)
router.get('/getorder/:id',auth.validateToken, Controllers.GetOrder)
router.get('/getdashboardorder/:id',auth.validateToken, Controllers.GetDashboardOrder)
router.get('/getorderbyid/:id',auth.validateToken, Controllers.GetOrderById)
router.patch('/updatestatus/:id',auth.validateToken, Controllers.UpdateStatus)
module.exports = router