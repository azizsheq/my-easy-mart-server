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
const ObjectId = require('mongodb').ObjectId

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l7yew.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // collection for products
    const productCollection = client.db("MyEasyMartDB").collection("products");
    // collection for orders    
    const orderCollection = client.db("MyEasyMartDB").collection("orders");
    console.log('connected with mongodb database')


    // data POST testing
    // const newEvent = { "name": "Order One" };
    // orderCollection.insertOne(newEvent)
    //     .then(result => { console.log(`Successfully inserted item with _id: ${result.insertedId}`) })
    //     .catch(err => { console.error(`Failed to insert item: ${err}`) })


    // adding new items to -> products
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



    // getting all items from -> products
    app.get('/getProducts', (req, res) => {
        productCollection.find()
            .toArray((err, products) => {
                res.send(products)
            })
    })


    // getting specific user clicked product from -> products
    app.get('/getClickedProduct/:id', (req, res) => {
        const id = ObjectId(req.params.id);
        productCollection.findOne({ _id: id })
            .then(documents => {
                // console.log(documents);
                res.send(documents);
            })
    })


    // delete each selected item  from -> products
    app.delete('/deleteProduct/:id', (req, res) => {
        const id = ObjectId(req.params.id);
        // console.log('select for delete: ', id);
        productCollection.findOneAndDelete({ _id: id })
            .then(documents => {
                res.send(!!documents.value)
            })
    })


    // adding new items to -> orders
    app.post('/addToOrders', (req, res) => {
        const newOrder = req.body;
        // console.log("New Product:", newProduct);
        orderCollection.insertOne(newOrder)
            .then(result => {
                console.log(`Successfully ordered item with _id: ${result.insertedId}`)
                res.send(result.insertedId > 0)
            })
            .catch(err => { console.error(`Failed to order item: ${err}`) })
    })


    
    //end
});


// default
app.get('/', (req, res) => {
    res.send('Hello, My Easy Mart Server is Running !')
})


// default
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})