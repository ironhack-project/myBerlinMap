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

// app.get('/restaurant-search', (req,res) => { 
//   const restaurant = req.query.artist.toLowerCase()
//   axios.get(('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//   const searchedRestaurant = artist.filter(artist => artist
//       .name
//       .toLowerCase()
//       .includes(req.query.name.toLowerCase())
//   .searchArtists(searchedRestaurant)
//   .then(data => {
//       console.log('artists: ', data.body.artists.items);
//       // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
//       res.render('artist-search-results', {artist : data.body.artists.items})
//   })   
//   .catch(err => console.log('The error while searching artists occurred: ', err));
// })






module.exports = router;
// module.exports = searchList();


//bad search===========================================================================
// router.get('/:userSearch', (req,res) => {
//   axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//   const restaurantList = response.data.merchants;
//   const restaurantNames = restaurantList.name
//   .then(response => {
//     console.log(restaurantNames)
//     // searchList(userSearch)
//   })
// });

// function searchList() {
//   console.log('searching')
//   let input, filter, ul, li, name, i, txtValue;

//   input = document.getElementById("userSearch");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("restaurantList");
//   li = ul.getElementsByTagName("li");

//   for (i = 0; i < restaurantList.length; i++) {
//       apiResults = restaurantList.name  
//       txtValue = apiResults || name.textContent || name.innerText;
//       // name = li[i].getElementsByTagName("a")[0];
//       //   txtValue = name.textContent || name.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
//  };