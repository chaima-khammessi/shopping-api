const mongosse = require('mongoose');


const productSchema = mongosse.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },

    image : {
        type : String,
        required:true
    }



    
})
module.exports = mongosse.model('Product', productSchema)