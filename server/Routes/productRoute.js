const express = require('express')
const Controllers = require('../Controllers/products')
const auth = require('../Middleware/auth')

const router = express.Router();

router.post('/additem',auth.validateToken, Controllers.AddItem)
router.get('/getProducts/:name', Controllers.GetProducts)
router.get('/getprofile/:id', auth.validateToken,Controllers.GetProfile)
router.get('/getproduct/:id', Controllers.GetProduct)
router.get('/getpopularitems/:name', Controllers.GetPopularItems)
router.patch('/updateitem/:id',auth.validateToken, Controllers.UpdateItem)
router.patch('/updatecategory/:id',auth.validateToken, Controllers.UpdateCategory)
router.delete('/deleteitem/:id',auth.validateToken, Controllers.DeleteItem)
module.exports = router