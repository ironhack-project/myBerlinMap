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

// <<<<<<< juliana
// // Middleware Setup
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// // session configuration
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 },
//     saveUninitialized: false,
//     resave: true,
//     store: new MongoStore({
//       // when the session cookie has an expiration date
//       // connect-mongo will use it, otherwise it will create a new 
//       // one and use ttl - time to live - in that case one day
//       mongooseConnection: mongoose.connection,
//       ttl: 24 * 60 * 60 * 1000
//     })
//   })
// )


// // Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// // default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';



// const index = require('./routes/index');
// app.use('/', index);

// const auth = require('./routes/auth');
// app.use('/', auth)

// const restaurants = require('./routes/restaurants');
// app.use('/', restaurants)

// const mylist = require('./routes/mylist');
// app.use('/', mylist)


// module.exports = app;
// =======
module.exports = {
  createApp,
};
// >>>>>>> master
