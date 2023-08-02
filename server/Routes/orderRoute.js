const express = require('express')
const Controllers = require('../Controllers/order')
const auth = require('../Middleware/auth')


const router = express.Router();

router.post('/addorder',auth.auth, Controllers.AddOrder)
router.get('/getorder/:id',auth.auth, Controllers.GetOrder)
router.get('/getdashboardorder/:id',auth.auth, Controllers.GetDashboardOrder)
router.get('/getorderbyid/:id',auth.auth, Controllers.GetOrderById)
router.patch('/updatestatus/:id',auth.auth, Controllers.UpdateStatus)
module.exports = router