/**
 * Super Admin Model-----------------------
 */

var mongoose = require('mongoose')
const Schema = mongoose.Schema;
var SuperAdminSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
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

const SuperAdmins = mongoose.model('superAdmins', SuperAdminSchema)

module.exports = SuperAdmins;