/*
Super Admin Model-----------------------
*/

var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var SuperAdminsSchema = new Schema({
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
})

const SuperAdmins = mongoose.model('SuperAdmins', SuperAdminsSchema)

module.exports = SuperAdmins;