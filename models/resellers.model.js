/*
Reseller Model-----------------------
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
    balance: {
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