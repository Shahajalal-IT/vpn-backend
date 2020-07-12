
/**
 * Transactions Model-----------------------
 */

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const DueSchema = new Schema({
    taken_by: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    taken_by_type: {
        type: String,
        required:true
    },
    taken_by_name: {
        type: String,
        required:true
    },
    given_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    given_by_name: {
        type: String,
        required:true
    },
    previous_due: {
        type: Number,
        required: true
    },
    current_due: {
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
DueSchema.plugin(mongoosePaginate);
const Due = mongoose.model('Due', DueSchema)
module.exports = Due;