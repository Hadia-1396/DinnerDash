const express = require('express')
const Controllers = require('../Controllers/products')

const router = express.Router();

router.post('/addrestaurant', Controllers.AddRestaurant)
router.post('/additem', Controllers.AddItem)
router.post('/addorder', Controllers.AddOrder)
router.get('/getlist', Controllers.GetList)
router.get('/getrestaurants', Controllers.GetRestaurants)
router.get('/getProducts/:name', Controllers.GetProducts)
router.get('/shippingfee/:name', Controllers.GetShippingFee)
router.get('/getprofile/:id', Controllers.GetProfile)
router.get('/getproduct/:id', Controllers.GetProduct)
router.get('/getorder/:id', Controllers.GetOrder)
router.get('/getdashboardorder/:id', Controllers.GetDashboardOrder)
router.get('/getpopularitems/:name', Controllers.GetPopularItems)
router.get('/getorderbyid/:id', Controllers.GetOrderById)
router.patch('/updateitem/:id', Controllers.UpdateItem)
router.patch('/updatestatus/:id', Controllers.UpdateStatus)
router.delete('/deleteitem/:id', Controllers.DeleteItem)
module.exports = router