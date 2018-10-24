const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    _nameGroup: String,
    _totalMember: String,
    _presentMember: Number
}, {collection:"unit"});

module.exports = mongoose.model('unit', unitSchema);