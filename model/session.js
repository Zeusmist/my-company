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

module.exports.UserSession = mongoose.model('UserSession', sessionSchema);
module.exports.AdminSession = mongoose.model('AdminSession', sessionSchema);