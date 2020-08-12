const MongoLib = require('../lib/mongo');

class ProductsServices {
    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags }};
        const product = await this.mongoDB.getAll(this.collection, query);
        return product || [];
    };

    async getProduct({ productId }) {
        const productById = await this.mongoDB.get(this.collection, productId);
        return productById || {};
    };

    async createProduct({ product }) {
        const createdProduct = await this.mongoDB.create(this.collection, product);
        return createdProduct;
    };

    async updateProduct({ product, productId }) {
        const updatedProduct = await this.mongoDB.update(this.collection, product, productId);
        return updatedProduct;
    };

    async deleteProduct({ productId }) {
        const deletedProduct = await this.mongoDB.delete(this.collection, productId);
        return deletedProduct;
    };

};

module.exports = ProductsServices;