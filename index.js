const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
const app = express();
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('REPLIQ  server running')
})

app.listen(prot, () => {
    console.log('REPLIQ server log');
})