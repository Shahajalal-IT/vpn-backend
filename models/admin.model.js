/**
 * Admin Model-----------------------
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
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
    name: {
        type: String,
        required: true
    },
    site_name: {
        type: String,
        required: true
    },
    site_title: {
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
    status: {
        type:Number,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'superAdmins',
        required:true
    }
})

const Admins = mongoose.model('admins', AdminSchema)

module.exports = Admins;