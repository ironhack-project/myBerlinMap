const express = require('express');
const router  = express.Router();
const axios = require('axios');


const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

router.get('/all' , (req,res) => {
  const loggedinUser = req.session.user;
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
      .then(response => {
        const restaurantList = response.data.merchants;
        // console.log(restaurantList)
        if (req.session.user) {
          res.render('./restaurants/all', {restaurantList , user : loggedinUser })
        } else {
          res.render('./restaurants/all', {restaurantList , user : loggedinUser })
      }
        // res.render('./restaurants/all', {restaurantList});
      });
});


module.exports = router;