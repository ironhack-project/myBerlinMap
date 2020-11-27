const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const User = require ('../models/User');


router.get('/signup' , (req,res) => {
    res.render('./auth/signup');
});


router.get('/login', (req, res) => {
    res.render ('./auth/login');
});

router.post('/login', (req, res, next) => {
    console.log('hello! validating credentails...')
    const { username, password } = req.body;
    User.findOne({ username: username })
      .then(found => {
        if (found === null) {
          res.render('./auth/login', { message: 'Invalid credentials' })
        }

        if (bcrypt.compareSync(password, found.password)) {
          req.session.user = found;
          console.log('Login successfull! Redirecting...')
          res.redirect('./');
          
        } else {
          res.render('./auth/login', { message: 'Invalid credentials' })
        }
      })
      .catch(err => {
        next(err);
      })      
  });

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    res.render('./auth/signup', { message: 'Your password must be 8 characters minimum' });
  }
  if (username === '') {
    res.render('./auth/signup', { message: 'This user name has already been taken' });
  }
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        res.render('./auth/signup', { message: 'This Username is already taken' })
      } else {
        const salt = bcrypt.genSaltSync();
        console.log(salt);
        const hash = bcrypt.hashSync(password, salt);
        User.create({ username: username, password: hash })
          .then(dbUser => {
            req.session.user = dbUser;
            console.log('Signup successfull! Redirecting...')
            res.redirect('./');
          })
          .catch(err => {
            next(err);
          })
      }
    })
    .catch(err => {
      next(err);
    })
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.redirect('./')
    }
  })
});





module.exports = router;
