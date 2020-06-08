/*
User Model-----------------------
*/

var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var UsersSchema = new Schema({
    pin: {
        type: String,
        required: true
    },
    phone_unique: {
        type: String
    },
    creator: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    expired_at: {
        type: Date
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: Number
    },
    active: {
        type: Number
    },
    admin_id: {
        type: String
    },
})

const Users = mongoose.model('Users', UsersSchema)

module.exports = Users;