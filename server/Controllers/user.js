const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../Models/user')

const AddUser =  async (req,res) => {
    const {name, email, password, confirmPassword} = req.body;
    
    try {
        const existingUser = await user.findOne({email});
        
        if (existingUser) {
           return res.status(401).json({message: "User already exists"})
        }
        
        if(password != confirmPassword) {
           return res.status(402).json({message: "Password not match"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await user.create({name: name, email: email, password: hashedPassword})

        const token = jwt.sign({email: newUser.email, id: newUser._id}, 'test')

        res.status(200).json({newUser, token})
    } catch (error) {
        res.status(400).json({message: "Something went wrong"})
    }
}

const GetUser = async (req,res) => {
    const {email, password} = req.body;

    try{
        const existingUser = await user.findOne({email});

        if(!existingUser) {
            return res.status(404).json({message: "User does not exists"})
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);

        if(!checkPassword) {
            return res.status(400).json({message: "Your password is incorrect"})
        }

        const token = jwt.sign({email: existingUser, id: existingUser._id}, 'test')

        res.status(200).json({existingUser, token})
    } catch {
        res.status(400).json({message: "Something went wrong"})
    }

}

module.exports = {
    AddUser: AddUser,
    GetUser, GetUser
}
