const express = require('express');
const productRouter = express.Router();
const ProductController = require('../../controllors/admin/ProductController');
let multer = require('multer');
const upload = multer({dest:'public/uploads/products'})
productRouter.post('/adminapi/product/list',upload.single('file'),ProductController.addProduct)
productRouter.post('/adminapi/product/list/:id',upload.single('file'),ProductController.editProduct)
productRouter.get('/adminapi/product/list',ProductController.getProduct)
productRouter.get('/adminapi/product/list/:id',ProductController.getProduct)
productRouter.delete('/adminapi/product/list/:id',ProductController.deleteProduct)

module.exports = productRouter;
