const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());






const uri = "mongodb+srv://Repliq:MzKBL50xj9HF1NKJ@cluster0.acij04d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongodb connect  
const mongodbConnect = async () => {
    try {
        await client.connect();


    }
    catch (error) {
        console.log(error);

    }

}
mongodbConnect()

// data collection
const user = client.db('repliq').collection('user');
const products = client.db('repliq').collection('product');
const booking = client.db('repliq').collection('booking');

// post user collection
app.put('/user', async (req, res) => {
    try {
        const man = req.body;
        console.log(man)
        const result = await user.insertOne(man);
        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// Get user collection
app.get('/user', async (req, res) => {
    try {
        const query = {}

        const result = await user.find(query).toArray()

        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// post Product collection
app.post('/addProduct', async (req, res) => {
    try {
        const course = req.body;
        const result = await products.insertOne(course);

        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// Get product collection
app.get('/addProduct', async (req, res) => {
    try {
        const query = {}

        const result = await products.find(query).toArray()

        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
            code: error.code,
        })
    }
})

// single product item
app.get('/addProduct/:id', async (req, res) => {
    try {
        const id = req.params.id

        const query = { _id: new ObjectId(id) }
        console.log(query);
        const resust = await products.findOne(query)
        console.log(resust);
        res.send(resust)

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
            code: error.code,

        })
    }
})

// card add Product collection
app.post('/booking', async (req, res) => {
    try {
        const course = req.body;
        const result = await booking.insertOne(course);

        res.send({
            success: true,
            data: result,
            message: 'Successfully  data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// Get product collection
app.get('/booking', async (req, res) => {
    try {
        const query = {}
        const result = await booking.find(query).toArray()
        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
            code: error.code,
        })
    }
})

// single booking id
app.get('/booking/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }

        const resust = await booking.findOne(query)

        res.send(resust)

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// delete booking
app.delete('/booking/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }
        const query = await booking.deleteOne(filter);
        res.send({
            success: true,
            data: query,
            message: 'Successfully get data'
        })

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})


app.get('/', (req, res) => {
    res.send('REPLIQ  server running')
})

app.listen(prot, () => {
    console.log('REPLIQ server log');
})