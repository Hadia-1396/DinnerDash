const express = require('express')
const Controllers = require('../Controllers/products')

const router = express.Router();

router.post('/additem', Controllers.AddItem)
router.get('/getProducts/:name', Controllers.GetProducts)
router.get('/getprofile/:id', Controllers.GetProfile)
router.get('/getproduct/:id', Controllers.GetProduct)
router.get('/getpopularitems/:name', Controllers.GetPopularItems)
router.patch('/updateitem/:id', Controllers.UpdateItem)
router.patch('/updatecategory/:id', Controllers.UpdateCategory)
router.delete('/deleteitem/:id', Controllers.DeleteItem)
module.exports = router