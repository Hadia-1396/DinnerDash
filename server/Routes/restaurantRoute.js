const express = require('express')
const Controllers = require('../Controllers/restaurant')

const router = express.Router();

router.post('/addrestaurant', Controllers.AddRestaurant)
router.get('/getrestaurants', Controllers.GetRestaurants)
router.get('/getlist', Controllers.GetList)
router.get('/shippingfee/:name', Controllers.GetShippingFee)
