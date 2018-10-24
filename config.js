require('dotenv').config();


exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/toolv2';
exports.PORT = process.env.PORT || 3200;