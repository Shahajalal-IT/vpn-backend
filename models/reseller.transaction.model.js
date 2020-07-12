/**
 * Reseller Transaction Model-----------------------
 */

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ResellerTransactionSchema = new Schema({
    reseller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resellers'
    },
    reseller_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    p_balance: {
        type: Number,
        required: true
    },
    c_balance: {
        type: Number,
        required: true
    },
    p_due: {
        type: Number,
        required: true
    },
    c_due: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required:true
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
ResellerTransactionSchema.plugin(mongoosePaginate);
const ResellerTransactions = mongoose.model('reseller_transaction', ResellerTransactionSchema)
module.exports = ResellerTransactions;