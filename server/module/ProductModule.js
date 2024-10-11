const mongoose = require('mongoose');
const Schma = mongoose.Schema;
const ProductType = {
    title:String,
    brief:String,
    particular:String,
    avater:String,
    editTime:Date
}

const ProductModule = mongoose.model('ProductModule', new Schma(ProductType));

module.exports = ProductModule;