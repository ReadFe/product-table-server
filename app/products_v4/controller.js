const { ObjectId } = require('mongodb');
const Product = require('./model');

const index = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    Product.find()
        .then(result => res.send(result))
        .catch(error => res.send(error))
};

const view = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.params;
    Product.find({_id: new ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error))
};

const store = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    const {name, price, stock, status} = req.body;
    const image_url = req.file.originalname;

    Product.create({name, price, stock, status, image_url})
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const destroy = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    const id = req.params.id
    Product.deleteOne({_id: new ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const update = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    let {name, price, stock, status, image_url} = req.body;
    const id = req.params.id;
    if(req.file) {
        image_url = req.file.originalname;
        console.log(req.file)
    }
    const updateData = {
        name,
        price,
        stock,
        status,
        image_url
    };
    
    Product.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    )
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

module.exports = {
    index,
    view,
    store,
    destroy,
    update
}