const express = require('express');
const router  = express.Router();
const axios = require('axios');

/* GET home page */
router.get('/', (req, res, next) => {
  // here we want to call the api
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
    .then(response => {
      // console.log(response.data.merchants);
      const coordinates = response.data.merchants.map ((merchant) => {
          let lon = merchant.location.coordinates.longitude;
          let lat = merchant.location.coordinates.latitude;
          return [lon,lat];
    
      });
      console.log(coordinates);
      //const latitude = response.data.merchants.location.coordinates.latitude;
      //const longitude = response.data.merchants.location.coordinates.longitude;
      const restaurantList = response.data.merchants;
      res.render('index', { restaurantList })
    })
});

module.exports = router;
