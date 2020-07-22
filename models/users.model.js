/**
 * User Model-----------------------
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    pin: {
        type: String,
        required: true,
        unique:true
    },
    user: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    phone_unique: {
        type: String
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
    creator_type: {
        type: String,
        required: true
    },
    activated_at: {
        type: Date
    },
    expired_at: {
        type: Date
    },
    type: {
        type: Number,
    },
    active: {
        type: Number,
    },
    status: {
        type: Number,
    },
    notes: {
        type: String,
    },
    device: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required:true
    }
});
UserSchema.plugin(mongoosePaginate);
const Users = mongoose.model('users', UserSchema)
module.exports = Users;