const express = require('express')
const Controllers = require('../Controllers/products')

const router = express.Router();

router.post('/addrestaurant', Controllers.AddRestaurant)
router.get('/getlist', Controllers.GetList)
router.post('/additem', Controllers.AddItem)
router.get('/getproductlist/:name', Controllers.GetProductList)
router.get('/getrestaurants', Controllers.GetRestaurants)
router.get('/getProducts/:name', Controllers.GetProducts)
module.exports = router