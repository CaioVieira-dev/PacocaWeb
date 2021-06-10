const Database = require('../db/config');

module.exports = {

    async getAll() {
        const db = await Database();

        const products = await db.all(`SELECT * FROM products`);

        await db.close();

        return products.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            pricing: product.pricing,
            promo: product.promo,
            flavours: product.flavours
        }));
    },
    async getSingle(id) {
        const db = await Database();

        const product = await db.get(`SELECT * FROM products WHERE id = ${id}`);

        await db.close();

        if (product == undefined) {
            return 'not found';
        }

        return {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            pricing: product.pricing,
            promo: product.promo,
            flavours: product.flavours
        }
    },
    async getSearched(name) {
        const db = await Database();

        const products = await db.all(`
        SELECT * FROM products 
        WHERE name LIKE '%${name}%'`);

        await db.close();

        if (products.length == 0) {
            return 'not found';
        }

        if (products) {
            return products.map(product => ({
                id: product.id,
                name: product.name,
                image: product.image,
                description: product.description,
                pricing: product.pricing,
                promo: product.promo,
                flavours: product.flavours
            }));
        }
    }
}