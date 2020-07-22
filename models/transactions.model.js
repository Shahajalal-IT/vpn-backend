/**
 * Transactions Model-----------------------
 */

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    given_by: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    given_by_type: {
        type: String,
        required:true
    },
    given_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'resellers',
    },
    previous_balance: {
        type: Number,
        required: true
    },
    current_balance: {
        type: Number,
        required: true
    },
    transaction_type: {
        type: Number,
        required: true
    },
    notes: {
        type: String
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
TransactionSchema.plugin(mongoosePaginate);
const Transactions = mongoose.model('transactions', TransactionSchema)
module.exports = Transactions;