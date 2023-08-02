const { default: mongoose } = require('mongoose');
const order = require('../Models/order.js');

const GetOrder =  async (req,res) => {
    const id = req.params.id;
    try {
        const orders = await order.find({userID: id}).populate("itemDetails");
        res.status(200).json(orders)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetOrderById =  async (req,res) => {
    const id = req.params.id;
    try {
        const orders = await order.findById(id).populate("itemDetails");
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const GetDashboardOrder =  async (req,res) => {
    const id = req.params.id;
    try {
        const orders = await order.find({}).populate({
            path: "itemDetails",
            match: {userID: id}
        });

        const authenticatedOrders = orders.filter((order) => {
            if(order.itemDetails.length) {
                return order;
            }
        })
  
        res.status(200).json(authenticatedOrders)
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

const UpdateStatus = async (req,res) => {
    const newStatus = req.body;
    const id= req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `No post with ${id} exists`})

    try {
        const updatedItem = await order.updateOne({_id: id}, {$set: {status: newStatus.newStatus, updatedAt: Date.now()}})
        res.status(200).json(updatedItem)
    } catch (error) {
        res.status(400).json({message: error.message})        
    } 
}

module.exports = {
    GetOrder,
    AddOrder,
    GetDashboardOrder,
    GetOrderById,
    UpdateStatus,
}