const express = require('express')
const Controllers = require('../Controllers/order')

const router = express.Router();

router.post('/addorder', Controllers.AddOrder)
router.get('/getorder/:id', Controllers.GetOrder)
router.get('/getdashboardorder/:id', Controllers.GetDashboardOrder)
router.get('/getorderbyid/:id', Controllers.GetOrderById)
router.patch('/updatestatus/:id', Controllers.UpdateStatus)
router.patch('/updatestatus/:id', Controllers.UpdateStatus)
