const { requiredType, defaultSchemaOptions, Schema, model } = require('../');
const { Cart } = require('./carts');
const { User } = require('./users');

const ordersSchema = new Schema({

    city: requiredType(String),
    street: requiredType(String),
    delieveryDate: requiredType(Date),
    creditCard: requiredType(Number),
    cartId: {...requiredType(String), ref:Cart },
    userId: {...requiredType(String), ref:User }

}, defaultSchemaOptions);

const Order = model('Order', ordersSchema);

module.exports = { Order };