require('dotenv').config();

const mongoose     = require('mongoose');
const { initApp }  = require('./init-app.js');

async function connectDb(mongoUrl) {
  return mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function createApp() {
  const mongooseConnection = await connectDb(process.env.MONGODB_URI);
  await initApp({ mongooseConnection });
  console.log('App created');
}

module.exports = {
  createApp,
};