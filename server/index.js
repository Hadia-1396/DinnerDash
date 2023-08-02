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

mongoose.connect('mongodb://hadiashabbir:hadiaSH123@ac-itur0ka-shard-00-00.hfconul.mongodb.net:27017,ac-itur0ka-shard-00-01.hfconul.mongodb.net:27017,ac-itur0ka-shard-00-02.hfconul.mongodb.net:27017/?ssl=true&replicaSet=atlas-ey0g41-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(3001, () => console.log("port is listening at 3001")))
.catch((error) => console.log(error.message))
