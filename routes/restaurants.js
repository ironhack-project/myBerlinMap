const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/all' , (req,res) => {
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
      .then(response => {
        const restaurantList = response.data.merchants;
        // console.log(restaurantList)
        res.render('./restaurants/all', {restaurantList});
       });
});


module.exports = router;