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

// app.get('/searchResults/restaurant/:text', (req,res) => { 
//   const restaurant = req.query.restaurant.toLowerCase()
//   .searchArtists(artist)
//   .then(data => {
//       console.log('artists: ', data.body.artists.items);
//       // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
//       res.render('details', {})
//   })   
//   .catch(err => console.log('The error while searching the restaurants occurred: ', err));
// })



function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



module.exports = router;