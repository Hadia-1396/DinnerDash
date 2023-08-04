const express = require('express')
const Controllers = require('../Controllers/products')
const auth = require('../Middleware/auth')

const router = express.Router();

router.get('/popular', Controllers.GetPopularItems)
router.get('/all', Controllers.GetProducts)
router.post('/',auth.validateToken, Controllers.AddItem)
router.get('/profile/:id', auth.validateToken,Controllers.GetProfile)
router.get('/:id', Controllers.GetProduct)
router.patch('/item/:id',auth.validateToken, Controllers.UpdateItem)
router.patch('/category/:id',auth.validateToken, Controllers.UpdateCategory)
router.delete('/:id',auth.validateToken, Controllers.DeleteItem)
module.exports = router