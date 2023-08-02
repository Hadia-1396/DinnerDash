const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require("cookie-parser")
require("dotenv").config();
const productRouter = require('../server/Routes/productRoute')
const userRouter = require('../server/Routes/userRoute')
const orderRoute = require('../server/Routes/orderRoute')
const restaurantRoute = require('../server/Routes/restaurantRoute');
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Server is live');
})


app.use('/products', productRouter);
app.use('/auth', userRouter);
app.use('/orders', orderRoute);
app.use('/restaurants', restaurantRoute);

mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(3001, () => console.log("port is listening at 3001")))
.catch((error) => console.log(error.message))
