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
  const app = await initApp({ mongooseConnection });
  console.log('App created');
  return app;

}

module.exports = {
  createApp,
};