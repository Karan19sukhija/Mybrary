const mongoose = require('mongoose');

// Now creating the schema of the author
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Now exporting this model so that it can be used

module.exports = mongoose.model('Author', authorSchema);