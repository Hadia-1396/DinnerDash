const { default: mongoose } = require('mongoose');
const restaurant = require('../Models/restaurant.js')

const AddRestaurant =  async (req,res) => {
    const item = req.body;
    const name = item.name;

    const existingItem = await restaurant.findOne({name})

    if(existingItem) {
        return res.status(400).json({message: "Restaurant already exists"})
    }

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

const GetRestaurants =  async (req,res) => {
    try {
        const restaurants = await restaurant.find();
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetShippingFee =  async (req,res) => {
    const name = req.params.name

    try {
        const restaurants = await restaurant.findOne({}).select('shippingFee -_id').where('name').eq(name);       
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    AddRestaurant,
    GetList,
    GetRestaurants,
    GetShippingFee,

}