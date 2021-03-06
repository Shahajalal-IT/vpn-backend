/**
 * Reseller Model-----------------------
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ResellerSchema = new Schema({
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
    role: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        required: true
    },
    ios_price: {
        type: Number,
        required: true
    },
    android_price: {
        type: Number,
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
        required:true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['admins', 'resellers']
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required:true
    }
});
ResellerSchema.plugin(mongoosePaginate);
const Resellers = mongoose.model('resellers', ResellerSchema)
module.exports = Resellers;