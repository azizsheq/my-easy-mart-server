// require
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// 
const app = express()
const port = process.env.PORT || 5055;

// test
// console.log(process.env.DB_USER);

// middle wire
app.use(cors())
app.use(express.json())

//mongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l7yew.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const productCollection = client.db("MyEasyMartDB").collection("products");
    console.log('connected with mongodb database')

    // data POST testing
    // const newEvent = { "name": "Product One" };
    // productCollection.insertOne(newEvent)
    //     .then(result => { console.log(`Successfully inserted item with _id: ${result.insertedId}`) })
    //     .catch(err => { console.error(`Failed to insert item: ${err}`) })

    // adding new product
    app.post('/addProduct', (req, res) => {
        const newProduct = req.body;
        // console.log("New Product:", newProduct);
        productCollection.insertOne(newProduct)
        .then(result => { 
            console.log(`Successfully inserted item with _id: ${result.insertedId}`)
            res.send(result.insertedId > 0)
        })
        .catch(err => { console.error(`Failed to insert item: ${err}`) })
    })
});


// default
app.get('/', (req, res) => {
    res.send('Hello, My Easy Mart Server is Running !')
})
// default
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})