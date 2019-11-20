const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 15
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 15
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 70
    },
    gender: {
        type: String,
        required: true,
        min: 4,
        max: 6
    },
    position: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    country: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    address: {
        type: String,
        required: true,
        min: 10,
        max: 150
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 150
    },
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 15
    },
    picture: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports.Staff = mongoose.model('Staff', staffSchema)
module.exports.Cafeteria = mongoose.model('Cafeteria', staffSchema)
module.exports.CustomerService = mongoose.model('CustomerService', staffSchema)
module.exports.Designer = mongoose.model('Designer', staffSchema)
module.exports.Engineer = mongoose.model('Engineer', staffSchema)
module.exports.FrontDesk = mongoose.model('FrontDesk', staffSchema)
module.exports.HumanResources = mongoose.model('HumanResources', staffSchema)
module.exports.Manager = mongoose.model('Manager', staffSchema)
module.exports.MedicalAdministrator = mongoose.model('MedicalAdministrator', staffSchema)
module.exports.Researcher = mongoose.model('Researcher', staffSchema)
module.exports.SalesRepresentative = mongoose.model('SalesRepresentative', staffSchema)
module.exports.Secretary = mongoose.model('Secretary', staffSchema)
module.exports.Security = mongoose.model('Security', staffSchema)
module.exports.OtherStaff = mongoose.model('OtherStaff', staffSchema)