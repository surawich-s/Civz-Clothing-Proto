require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async(req, res) => {
    const posts = await loadCollection();
    res.send(await posts.find({}).toArray());
});

router.post('/', async(req, res) => {
    const posts = await loadCollection();
    await posts.insertOne(req.body.form)
    res.status(201).send();
});

router.delete('/:id', async(req, res) => {
    const posts = await loadCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadCollection() {
    const client = await mongodb.MongoClient.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('civz').collection('products');
}

module.exports = router;