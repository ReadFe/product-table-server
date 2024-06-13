const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field nama harus ada'],
        minlength: 3,
        maxlength: 100
    },
    
    price: {
        type: Number,
        required: true,
        min: 1000,
        maxlength: 100000000
    },
    
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    image_url: String
    
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;