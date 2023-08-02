const express = require('express')
const Controllers = require('../Controllers/restaurant')
const auth = require('../Middleware/auth')


const router = express.Router();

router.post('/addrestaurant',auth.validateToken, Controllers.AddRestaurant)
router.get('/getrestaurants', Controllers.GetRestaurants)
router.get('/getlist', Controllers.GetList)
router.get('/shippingfee/:name', Controllers.GetShippingFee)
module.exports = router