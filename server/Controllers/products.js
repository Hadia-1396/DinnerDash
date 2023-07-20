const product = require('../Models/product')
const restaurant = require('../Models/restaurant.js')

const AddRestaurant =  async (req,res) => {
    const item = req.body;
    const newRestaurant = new restaurant(item);

    try {
        await newRestaurant.save();
        res.status(200).json(newRestaurant)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetList =  async (req,res) => {
    try {
        const restaurants = await restaurant.find({}).select('name');
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetProductList =  async (req,res) => {
    const name = req.params.name;
    try {
        const products = await product.find({}).select('name').where('restaurantName').eq(name);
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const AddItem = async (req,res) => {
    const item = req.body;
    const newItem = new product(item);
    try {
        await newItem.save();
        res.status(200).json(newItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

module.exports = {
    AddRestaurant: AddRestaurant,
    GetList: GetList,
    AddItem: AddItem,
    GetProductList: GetProductList
}