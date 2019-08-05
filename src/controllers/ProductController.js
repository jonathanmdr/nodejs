const mongoose = require("mongoose");

const Product = mongoose.model("Product");

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });
        res.statusCode = 200;
        return res.json(products);
    },

    async show(req, res) {
        const product = await Product.findById(req.params.id);
        product !== null ? res.statusCode = 200 : res.statusCode = 404;
        return res.json(product);
    },

    async store(req, res) {
        const product = await Product.create(req.body);
        product !== null ? res.statusCode = 201 : res.statusCode = 400;
        return res.json(product);
    },

    async update(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
            new: true 
        });
        product !== null ? res.statusCode = 200 : res.statusCode = 400;
        return res.json(product);
    },

    async destroy(req, res) {
        const product = await Product.findByIdAndDelete(req.params.id);
        product !== null ? res.statusCode = 204 : res.statusCode = 404
        return res.send();
    },
};