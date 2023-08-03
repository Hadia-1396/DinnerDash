const express = require('express')
const Controllers = require('../Controllers/products')
const auth = require('../Middleware/auth')

const router = express.Router();

router.post('/',auth.validateToken, Controllers.AddItem)
router.get('/all/:name', Controllers.GetProducts)
router.get('/profile/:id', auth.validateToken,Controllers.GetProfile)
router.get('/:id', Controllers.GetProduct)
router.get('/popular/:name', Controllers.GetPopularItems)
router.patch('/update/:id',auth.validateToken, Controllers.UpdateItem)
router.patch('/:id',auth.validateToken, Controllers.UpdateCategory)
router.delete('/:id',auth.validateToken, Controllers.DeleteItem)
module.exports = router