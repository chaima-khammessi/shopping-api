const mongosse = require('mongoose');
const schema =  mongosse.Schema ; 



ObjectId = schema.ObjectId;

const orderSchema = mongosse.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: Array,

    }


})
module.exports = mongosse.model('Order', orderSchema)