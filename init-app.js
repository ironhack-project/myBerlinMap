const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
//==========================================================================
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//==========================================================================

async function initApp({ mongooseConnection }) {
    const app = express();

    // Middleware Setup
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            cookie: { maxAge: 24 * 60 * 60 * 1000 },
            saveUninitialized: false,
            resave: true,
            store: new MongoStore({
                mongooseConnection,
                ttl: 24 * 60 * 60 * 1000
            })
        })
    )
    app.use(require('node-sass-middleware')({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        sourceMap: true
    }));


    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
    app.locals.title = 'My Berlin Map';


    const index = require('./routes/index');
    app.use('/', index);

    const auth = require('./routes/auth');
    app.use('/', auth)

    const restaurants = require('./routes/restaurants');
    app.use('/', restaurants)

    const mylist = require('./routes/mylist');
    app.use('/', mylist)

    return app;
  
}


module.exports = {
    initApp,
};