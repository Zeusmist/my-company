const mongoose = require('mongoose');
const sessionSchema = mongoose.Schema({
    staffId: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Session', sessionSchema);