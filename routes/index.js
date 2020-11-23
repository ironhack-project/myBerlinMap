const express = require('express');
const router  = express.Router();
const axios = require('axios'); 
let coordinates

/* GET home page */
router.get('/', (req, res, next) => {
  // here we want to call the api
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
    .then(response => {
      // console.log(response.data.merchants);
      coordinates = response.data.merchants.map((merchant) => {
        return [
        merchant.location.coordinates.longitude,
        merchant.location.coordinates.latitude
        ]
        });        
      const restaurantList = response.data.merchants;
      res.render('index', { restaurantList })
    })
});


router.get('/rawdata', (req,res,next) => {
  // console.log(coordinates);
  return res.json (coordinates)
});


router.get('/search', (req,res,next) => {
  res.render ('search')
});

module.exports = router;
