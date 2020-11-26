require('dotenv').config();

const mongoose     = require('mongoose');
const { initApp }  = require('./init-app.js');

const { MONGODB_URI } = process.env;

async function connectDb(mongoUrl) {
  return mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function createApp() {
  const { connection: mongooseConnection } = await connectDb(MONGODB_URI);
  console.log(`... mongo connection established ...`);
  const app = await initApp({ mongooseConnection });
  console.log('... app created ...');
  return app;

}

module.exports = {
  createApp,
};