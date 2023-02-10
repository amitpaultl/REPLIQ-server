const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

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
app.get('/user',  async (req, res) => {
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





app.get('/', (req, res) => {
    res.send('REPLIQ  server running')
})

app.listen(prot, () => {
    console.log('REPLIQ server log');
})