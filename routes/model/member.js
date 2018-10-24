const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    _mstt: {type: String, unique: true},
    _memberName: String,
    _unitPosition: String,
    _personalImage: String,
    _present: {type: Boolean, default: false},
    yob: Number,
    gender: String,
    folk: String,
    religion: String,
    qualification: String,
    qualificationLLCT: String,
    partyMember: String,
    groupNo: Number

}, {collection:"member"});

module.exports = mongoose.model('member', memberSchema);