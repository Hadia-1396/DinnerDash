const bcrypt = require('bcrypt')
require("dotenv").config();
const jwt = require('jsonwebtoken')
const user = require('../Models/user')

const Signup =  async (req,res) => {
    const {name, email, password, confirmPassword, displayName, role} = req.body;
    
    try {
        const existingUser = await user.findOne({email});
        
        if (existingUser) {
           return res.status(401).json({message: "User already exists"})
        }
        
        if(password != confirmPassword) {
           return res.status(402).json({message: "Password not match"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await user.create({name: name, email: email, password: hashedPassword, displayName: displayName, role: role})

        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({newUser, token})
    } catch (error) {
        res.status(400).json({message: "Something went wrong"})
    }
}

const Login = async (req,res) => {
    const {email, password} = req.body;
    const role = req.params.role

    try{
        const existingUser = await user.findOne({email}).where('role').eq(role);

        if(!existingUser) {
            return res.status(404).json({message: "Incorrect Credentials"})
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);

        if(!checkPassword) {
            return res.status(400).json({message: "Incorrect Credentials"})
        }

        const token = jwt.sign({email: existingUser, id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({existingUser, token})

    } catch {
        res.status(400).json({message: "Something went wrong"})
    }

}

module.exports = {
    Signup,
    Login
}
