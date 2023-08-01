const product = require('./Models/product')
const restaurant = require('./Models/restaurant.js')
const order = require('./Models/order.js');
const user = require('./Models/user.js')

const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const app = express();


mongoose.connect('mongodb://localhost:27017/dinnerdash')
.then(() => app.listen(3000, () => console.log("port is listening at 3000")))
.catch((error) => console.log(error.message))

let hashedPassword = bcrypt.hash('password', 12)

const orderSeed = [
    {
        name: 'Rachel Warbelow',
        email: 'demo+rachel@jumpstartlab.com',
        mobileNumber: '0232-2345123',
        city: 'Lahore',
        address: 'Shalimar Link Road',
        restaurantName: 'KFC',
        itemDetails: ['64c528a13c957cea51fc3592', '64c528a13c957cea51fc3595'],
        quantity: [1,2],
        shipping: 50,
        status: 'ordered',
        subTotal: 1500,
        total: 2000,
        userID: '64c514bdc67d1b49f7c5718e',
    },
    {
        name: 'Rachel Warbelow',
        email: 'demo+rachel@jumpstartlab.com',
        mobileNumber: '0232-2345123',
        city: 'Lahore',
        address: 'Shalimar Link Road',
        restaurantName: 'KFC',
        itemDetails: ['64c528a13c957cea51fc3592', '64c528a13c957cea51fc3595'],
        quantity: [2,1],
        shipping: 50,
        status: 'ordered',
        subTotal: 1200,
        total: 1250,
        userID: '64c514bdc67d1b49f7c5718e',
    },
    {
        name: 'Rachel Warbelow',
        email: 'demo+rachel@jumpstartlab.com',
        mobileNumber: '0232-2345123',
        city: 'Lahore',
        address: 'Shalimar Link Road',
        restaurantName: 'Cheezios',
        itemDetails: ['64c528a13c957cea51fc3598'],
        quantity: [2],
        shipping: 100,
        status: 'paid',
        subTotal: 1300,
        total: 1400,
        userID: '64c514bdc67d1b49f7c5718e',
    },
    {
        name: 'Jeff Casimir',
        email: 'demo+jeff@jumpstartlab.com',
        mobileNumber: '0243-2124346',
        city: 'Karachi',
        address: 'Defence',
        restaurantName: 'Jade Cafe',
        itemDetails: ['64c528a13c957cea51fc359e', '64c528a13c957cea51fc35a3'],
        quantity: [3,2],
        shipping: 150,
        status: 'ordered',
        subTotal: 1200,
        total: 1350,
        userID: '64c514bdc67d1b49f7c5718f',
    },
    {
        name: 'Jeff Casimir',
        email: 'demo+jeff@jumpstartlab.com',
        mobileNumber: '0243-2124346',
        city: 'Karachi',
        address: 'Defence',
        restaurantName: 'KFC',
        itemDetails: ['64c528a13c957cea51fc3592', '64c528a13c957cea51fc3595'],
        quantity: [2,1],
        shipping: 50,
        status: 'cancelled',
        subTotal: 1000,
        total: 1050,
        userID: '64c514bdc67d1b49f7c5718f',
    },
    {
        name: 'Jeff Casimir',
        email: 'demo+jeff@jumpstartlab.com',
        mobileNumber: '0243-2124346',
        city: 'Karachi',
        address: 'Defence',
        restaurantName: 'KFC',
        itemDetails: ['64c528a13c957cea51fc3592'],
        quantity: [2],
        shipping: 50,
        status: 'completed',
        subTotal: 1350,
        total: 1400,
        userID: '64c514bdc67d1b49f7c5718f',
    },
    {
        name: 'Jeff Casimir',
        email: 'demo+jeff@jumpstartlab.com',
        mobileNumber: '0243-2124346',
        city: 'Karachi',
        address: 'Defence',
        restaurantName: 'Cheezios',
        itemDetails: ['64c528a13c957cea51fc3598'],
        quantity: [1],
        shipping: 100,
        status: 'completed',
        subTotal: 2000,
        total: 2100,
        userID: '64c514bdc67d1b49f7c5718f',
    },
    {
        name: 'Jorge Tellez',
        email: 'demo+jorge@jumpstartlab.com',
        mobileNumber: '0324-2562356',
        city: 'Lahore',
        address: 'Township',
        restaurantName: 'KFC',
        itemDetails: ['64c528a13c957cea51fc3592', '64c528a13c957cea51fc3595'],
        quantity: [2,4],
        shipping: 50,
        status: 'cancelled',
        subTotal: 1200,
        total: 1250,
        userID: '64c514bdc67d1b49f7c57190',
    },
    {
        name: 'Jorge Tellez',
        email: 'demo+jorge@jumpstartlab.com',
        mobileNumber: '0324-2562356',
        city: 'Lahore',
        address: 'Township',
        restaurantName: 'Cheezios',
        itemDetails: ['64c528a13c957cea51fc3598'],
        quantity: [2],
        shipping: 100,
        status: 'completed',
        subTotal: 1440,
        total: 1540,
        userID: '64c514bdc67d1b49f7c57190',
    },
    {
        name: 'Jorge Tellez',
        email: 'demo+jorge@jumpstartlab.com',
        mobileNumber: '0324-2562356',
        city: 'Lahore',
        address: 'Township',
        restaurantName: 'Cheezios',
        itemDetails: ['64c528a13c957cea51fc3598'],
        quantity: [4],
        shipping: 100,
        status: 'paid',
        subTotal: 1344,
        total: 1444,
        userID: '64c514bdc67d1b49f7c57190',
    },
]

const userSeed = [
    {
        name: 'Rachel Warbelow',
        email: 'demo+rachel@jumpstartlab.com',
        password: 'password',
        role: 'customer'
    },
    {
        name: 'Jeff Casimir',
        email: 'demo+jeff@jumpstartlab.com',
        password: 'password',
        displayName: 'j3',
        role: 'customer'
    },
    {
        name: 'Jorge Tellez',
        email: 'demo+jorge@jumpstartlab.com',
        password: 'password',
        displayName: 'novohispano',
        role: 'customer'
    },
    {
        name: 'Josh Cheek',
        email: 'demo+josh@jumpstartlab.com',
        password: 'password',
        displayName: 'josh',
        role: 'admin'
    },
]

const productSeed = [
    {
        name: 'Mighty Burger',
        description: 'zinger mighty burger with cheese and jalepeno',
        price: 1500,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'KFC',
        status: 'in-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Kentucky Burger',
        description: 'zinger Kentucky burger with tomatoes and sausages',
        price: 1000,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'KFC',
        status: 'in-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Krunch Burger',
        description: 'zinger Krunch burger with chilli sauce',
        price: 700,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'KFC',
        status: 'out-of-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Tangy Masala Wings',
        description: 'Spicy wings with tangy masala sauce',
        price: 1200,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362455/gwwwpbl5hrhom4oga6u5.jpg',
        restaurantName: 'KFC',
        status: 'in-stock',
        category: ['fast food', 'small plate', 'wings'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Salsa Wings',
        description: 'Spicy wings with salsa masala sprinkled',
        price: 1250,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362455/gwwwpbl5hrhom4oga6u5.jpg',
        restaurantName: 'KFC',
        status: 'in-stock',
        category: ['fast food', 'small plate', 'large plate', 'wings'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Crownt Crust Pizza',
        description: 'Crownt crust pizza',
        price: 1850,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378485/rzfqwmeofzxioy0fzlyf.jpg',
        restaurantName: 'Cheezios',
        status: 'in-stock',
        category: ['fast food', 'pizza'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Crust Stuffed Pizza',
        description: 'Stuffed crust pizza with kebab and cheese fillings',
        price: 1800,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378485/rzfqwmeofzxioy0fzlyf.jpg',
        restaurantName: 'Cheezios',
        status: 'in-stock',
        category: ['fast food', 'pizza', 'large'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Tikka Pizza',
        description: 'Chicken tikka pizza with spicy tikka masala',
        price: 1200,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378485/rzfqwmeofzxioy0fzlyf.jpg',
        restaurantName: 'Cheezios',
        status: 'out-of-stock',
        category: ['fast food', 'pizza'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Cheese Pasta',
        description: 'Chicken cheese pasta with extra cheese toppings',
        price: 1550,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378529/ggo1vawztrr38clbay3h.jpg',
        restaurantName: 'Cheezios',
        status: 'out-of-stock',
        category: ['fast food', 'pasta'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Tikka Pasta',
        description: 'Chicken Tikka pasta with tikka masala chicken',
        price: 1550,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378529/ggo1vawztrr38clbay3h.jpg',
        restaurantName: 'Cheezios',
        status: 'in-stock',
        category: ['fast food', 'pasta'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Mighty Burger',
        description: 'zinger mighty burger with cheese and jalepeno',
        price: 1500,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Kentucky Burger',
        description: 'zinger Kentucky burger with tomatoes and sausages',
        price: 1000,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Krunch Burger',
        description: 'zinger Krunch burger with chilli sauce',
        price: 700,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362424/acrwmmitvz3iqah9zkkk.jpg',
        restaurantName: 'Jade Cafe',
        status: 'out-of-stock',
        category: ['fast food', 'burger'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Tangy Masala Wings',
        description: 'Spicy wings with tangy masala sauce',
        price: 1200,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362455/gwwwpbl5hrhom4oga6u5.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'small plate', 'wings'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Salsa Wings',
        description: 'Spicy wings with salsa masala sprinkled',
        price: 1250,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362455/gwwwpbl5hrhom4oga6u5.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'small plate', 'large plate', 'wings'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Crownt Crust Pizza',
        description: 'Crownt crust pizza',
        price: 1850,
        photoURL: '',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'pizza'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Crust Stuffed Pizza',
        description: 'Stuffed crust pizza with kebab and cheese fillings',
        price: 1800,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378485/rzfqwmeofzxioy0fzlyf.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'pizza', 'large'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Tikka Pizza',
        description: 'Chicken tikka pizza with spicy tikka masala',
        price: 1200,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378485/rzfqwmeofzxioy0fzlyf.jpg',
        restaurantName: 'Jade Cafe',
        status: 'out-of-stock',
        category: ['fast food', 'pizza'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Cheese Pasta',
        description: 'Chicken cheese pasta with extra cheese toppings',
        price: 1550,
        photoURL: '',
        restaurantName: 'Jade Cafe',
        status: 'out-of-stock',
        category: ['fast food', 'pasta'],
        userID: '64c527be84d0faa1fdb5188e'
    },
    {
        name: 'Chicken Tikka Pasta',
        description: 'Chicken Tikka pasta with tikka masala chicken',
        price: 1550,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690378529/ggo1vawztrr38clbay3h.jpg',
        restaurantName: 'Jade Cafe',
        status: 'in-stock',
        category: ['fast food', 'pasta'],
        userID: '64c527be84d0faa1fdb5188e'
    },
]

const restaurantSeed = [
    {
        name: 'KFC',
        shippingFee: 50,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362345/iaweubrftm6dq6enyc3l.jpg'
    },
    {
        name: 'Cheezios',
        shippingFee: 120,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362364/ytkgg6ue9bi5tfw7izwi.jpg'
    },
    {
        name: 'Jade Cafe',
        shippingFee: 150,
        photoURL: 'http://res.cloudinary.com/dpidz8n5y/image/upload/v1690362398/g54dp3zcckfsol792rrr.jpg'
    },
]


const seedDB = async () => {
    await restaurant.deleteMany({});
    await restaurant.insertMany(restaurantSeed) 
    // await user.deleteMany({});
    // await user.insertMany(userSeed) 
    await product.deleteMany({});
    await product.insertMany(productSeed) 
}

const OrderSeedDB = async () => {
    await order.deleteMany({});
    await order.insertMany(orderSeed) 
}

// const createHashed = async () => {
//     const saltRounds = 12;
//     for (const user of userSeed) {
//       const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//       user.password = hashedPassword;
//     }
//     await seedDB();
// }

// createHashed()
OrderSeedDB();