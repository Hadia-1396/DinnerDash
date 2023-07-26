const product = require('../Models/product')
const restaurant = require('../Models/restaurant.js')
const order = require('../Models/order.js');
const { default: mongoose } = require('mongoose');

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


const GetProducts =  async (req,res) => {
    const name = req.params.name;
    try {
        const products = await product.find().where('restaurantName').eq(name);
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetProduct =  async (req,res) => {
    const name = req.params.name;
    const id = req.params.id
    try {
        const products = await product.findById(id);
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetProfile =  async (req,res) => {
    const id = req.params.id;
    try {
        const products = await product.find({userID: id});
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const AddItem = async (req,res) => {
    const item = req.body;
    const name = item.name;
    const existingItem = await product.findOne({name}).where('restaurantName').eq(item.restaurantName)

    if(existingItem) {
        return res.status(400).json({message: "Product already exists"})
    }
    const newItem = new product({name: item.name, description: item.description, price: item.price, status: item.status, photoURL: item.photoURL, restaurantName: item.restaurantName, category: item.category, userID: new mongoose.Types.ObjectId(item.userID)});
    try {
        await newItem.save();
        res.status(200).json(newItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

const AddOrder = async (req,res) => {
    const items = req.body;
    const newOrder = new order(items);
    try {
        await newOrder.save();
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

const UpdateItem = async (req,res) => {
    const item = req.body;
    const name = item.name
    const id= req.params.id;


    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    const ID = await product.findOne({id})
    if(!ID) {
        return res.status(404).json({message: `No post with ${id} exists`})
    }

    const existingItem = await product.findOne({name}).where('restaurantName').eq(item.restaurantName)

    if(existingItem) {
        return res.status(400).json({message: "Product already exists"})
    }

    try {
        const updatedItem = await product.findByIdAndUpdate(id, item)
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

const DeleteItem = async (req,res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    await product.findByIdAndRemove(id);

    res.status(200).json({message: `item with ${id} has been removed`})
}


module.exports = {
    AddRestaurant: AddRestaurant,
    GetList: GetList,
    AddItem: AddItem,
    GetRestaurants: GetRestaurants,
    GetProducts: GetProducts,
    AddOrder: AddOrder,
    GetShippingFee: GetShippingFee,
    GetProfile: GetProfile,
    UpdateItem: UpdateItem,
    DeleteItem: DeleteItem,
    GetProduct: GetProduct
}
