/*
Admin Model-----------------------
*/

var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var AdminsSchema = new Schema({
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
        ref: "SuperAdmins",
        required: true
    },
})

const Admins = mongoose.model('Admins', AdminsSchema)

module.exports = Admins;