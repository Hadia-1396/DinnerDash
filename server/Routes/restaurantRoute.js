const express = require('express')
const Controllers = require('../Controllers/restaurant')
const auth = require('../Middleware/auth')


const router = express.Router();

router.post('/',auth.validateToken, Controllers.AddRestaurant)
router.get('/', Controllers.GetRestaurants)
router.get('/list', Controllers.GetList)
router.get('/:name', Controllers.GetShippingFee)
module.exports = router