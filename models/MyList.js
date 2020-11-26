const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User');

const mylistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: User },
    restaurants: [{ 
        comment: String,
        restaurantId: String
    }]});

const MyList = mongoose.model('MyList', mylistSchema);

module.exports = MyList;