const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
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
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
    };
    Product.create({name, price, stock, status, image_url})
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const destroy = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.params.id
    Product.deleteOne({_id: new ObjectId(id)})
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const update = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
    const {name, price, stock, status} = req.body;
    const id = req.params.id;
    const image = req.file;
    console.log(image)
    const updateData = {
        name,
        price,
        stock,
        status
    };

    if (image) {
        console.log('oke')
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        var image_url = target;
    };

    if (image_url) {
        console.log('oke2')
        updateData.image_url = image_url;
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