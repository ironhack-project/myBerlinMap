const express = require('express');
const router  = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  // here we want to call the api
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
    .then(response => {
      // console.log(response.data.merchants);
      const restaurantList = response.data.merchants;
      res.render('index', { restaurantList })
    })
});

module.exports = router;
