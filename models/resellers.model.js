/**
* Reseller Model-----------------------
*/

var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var ResellersSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    balance: {
       type: Number
    },
    ios_price: {
        type: Number
    },
    android_price: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admins",
        required: true
    },
})

const Resellers = mongoose.model('Resellers', ResellersSchema)

module.exports = Resellers;