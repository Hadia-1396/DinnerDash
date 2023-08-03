const product = require('../Models/product')
const order = require('../Models/order.js');
const { default: mongoose } = require('mongoose');


const GetProducts =  async (req,res) => {
    const name = req.params.name;
    try {
        const products = await product.find().where('restaurantName').eq(name);
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetPopularItems =  async (req,res) => {
    const name = req.params.name;
    try {
        const count_products = await order.aggregate([
            {
                $match: {restaurantName: name}
            },
            {
                $unwind: '$itemDetails'
            },
            {
                $sortByCount: '$itemDetails'
            },
            {
                $limit: 1
            },
        ])

        const idArray = count_products.map((item) => {
           return item._id.toString()
        })
        const products = await product.find({
            _id: {$in: idArray}
        })
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetProduct =  async (req,res) => {
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
    if(!req.authToken) return res.status(400).json({message: "Unauthenticated"}) 
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

    if(!req.authToken) return res.status(400).json({message: "Unauthenticated"}) 

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

const UpdateItem = async (req,res) => {
    const item = req.body;
    const name = item.name
    const id= req.params.id;

    if(!req.authToken) return res.status(400).json({message: "Unauthenticated"}) 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    try {
        const updatedItem = await product.findByIdAndUpdate(id, item)
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

const UpdateCategory = async (req,res) => {
    const newCategory = req.body;
    const id= req.params.id;

    if(!req.authToken) return res.status(400).json({message: "Unauthenticated"}) 
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    try {
        const updatedItem = await product.updateOne({_id: id}, {$set: {category: newCategory.categoryArray}})
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

const DeleteItem = async (req,res) => {
    const id = req.params.id;

    if(!req.authToken) return res.status(400).json({message: "Unauthenticated"}) 
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    await product.findByIdAndRemove(id);

    res.status(200).json({message: `item with ${id} has been removed`})
}


module.exports = {
    AddItem,
    GetProducts,
    GetProfile,
    UpdateItem,
    DeleteItem,
    GetProduct,
    GetPopularItems,
    UpdateCategory
}
