// const { default: Axios } = require("axios");

// const express = require('express');
// const router  = express.Router();
// const axios = require('axios');

// // router.get('/all' , (req,res) => {
// //   axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
// //       .then(response => {
// //         const restaurantList = response.data.merchants;
// //         // console.log(restaurantList)
// //         res.render('./restaurants/all', {restaurantList});
// //        });
// // });

// router.get('/:userSearch', (req,res) => {
//   axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//   const restaurantList = response.data.merchants;
//   const restaurantNames = restaurantList.name
//   .then(response => {
//     searchList(userSearch)
//   })
// });

function searchList() {
  let input, filter, ul, li, name, i, txtValue;

  input = document.getElementById("userSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("restaurantList");
  li = ul.getElementsByTagName("li");

  // console.log(li)

  for (i = 0; i <150 ; i++) {
      // txtValue = apiResults || name.textContent || name.innerText;
      name = li[i].getElementsByTagName("a")[0];
      console.log(name)
      txtValue = name.textContent || name.innerText;
      // console.log(txtValue)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
 };


// module.exports = router;