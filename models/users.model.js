/**
 * User Model-----------------------
 */

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    serial: {
        type: Number,
        unique:true
    },
    pin: {
        type: String,
        required: true,
        unique:true
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
UserSchema.plugin(AutoIncrement, {inc_field: 'serial'});
const Users = mongoose.model('users', UserSchema)
module.exports = Users;