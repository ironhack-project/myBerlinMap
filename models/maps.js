const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const mapSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: User }],
    name: String,
    restaurants: [String]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;