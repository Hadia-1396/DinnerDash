const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const productRouter = require('../server/Routes/productRoute')
const userRouter = require('../server/Routes/userRoute')
const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is live');
})

app.use('/', productRouter);
app.use('/auth', userRouter);

mongoose.connect('mongodb://localhost:27017/dinnerdash')
.then(() => app.listen(3000, () => console.log("port is listening at 3000")))
.catch((error) => console.log(error.message))