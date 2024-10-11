const ProductService = require('../../service/admin/ProductService');
const ProductController = {
    addProduct: async (req, res) => {
        let { title, brief, particular } = req.body;
        let avater = req.file ? 'uploads/products/' + req.file.filename : '';
        await ProductService.addProduct({ title, brief, particular, avater, editTime: new Date() });
        res.send({
            'ActionType': 'OK'
        })
    },
    editProduct: async (req, res) => {
        let { id } = req.params;
        let { title, brief, particular } = req.body;
        let avater = req.file ? 'uploads/products/' + req.file.filename : '';
        await ProductService.editProduct({ _id: id, title, brief, particular, avater, editTime: new Date() });
        res.send({
            'ActionType': 'OK'
        })
    },
    getProduct: async (req, res) => {
        let { id } = req.params;
        let result = await ProductService.getProduct({_id: id});
        res.send({
            'ActionType': 'OK',
            'data': result
        })
    },
    deleteProduct: async (req, res) => {    
        let {id} = req.params
        await ProductService.deleteProduct({_id: id});
        res.send({
            'ActionType': 'OK',
            'data': '删除成功'
        })
    }
}
module.exports = ProductController;