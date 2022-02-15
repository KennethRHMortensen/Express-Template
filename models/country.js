// Create model that interacts with database
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    countrycode: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    }
})

// using .model it allows us to interact directly with the database using the schema
module.exports = mongoose.model('Country', countrySchema);