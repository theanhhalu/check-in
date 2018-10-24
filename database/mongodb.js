const mongoose = require('mongoose');
const {MONGODB_URI} = require('../config');

exports.init = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    const conn = mongoose.connection;
    conn.on('connected', () => console.log('MongoDB connected'));
    conn.on('error', (err) => console.log(err));
    conn.on('disconnected', () => console.log('MongoDB disconnected'));
}