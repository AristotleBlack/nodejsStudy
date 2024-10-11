const productModule = require('../../module/ProductModule');
const ProductService = {
    addProduct: async ({ title, brief, particular, avater, editTime }) => {
        await productModule.create({
            title, brief, particular, avater, editTime
        })
    },
    getProduct: async ({ _id }) => {
        return await _id ? productModule.findOne({ _id }) : productModule.find()
    },
    deleteProduct: async ({ _id }) => {
        await productModule.deleteOne({ _id })

    },
    editProduct: async ({ _id, title, brief, particular, avater, editTime }) => {
        if (avater !== '') {
            await productModule.updateOne({ _id }, {
                title, brief, particular, avater, editTime
            })
        }else {
            await productModule.updateOne({ _id }, {
                title, brief, particular, editTime
            })
        }
    }
}
module.exports = ProductService;