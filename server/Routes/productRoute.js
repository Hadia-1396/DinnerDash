const express = require('express')
const Controllers = require('../Controllers/products')
const auth = require('../Middleware/auth')

const router = express.Router();

router.post('/additem',auth.auth, Controllers.AddItem)
router.get('/getProducts/:name', Controllers.GetProducts)
router.get('/getprofile/:id', auth.auth,Controllers.GetProfile)
router.get('/getproduct/:id', Controllers.GetProduct)
router.get('/getpopularitems/:name', Controllers.GetPopularItems)
router.patch('/updateitem/:id',auth.auth, Controllers.UpdateItem)
router.patch('/updatecategory/:id',auth.auth, Controllers.UpdateCategory)
router.delete('/deleteitem/:id',auth.auth, Controllers.DeleteItem)
module.exports = router