const express = require('express');
const router  = express.Router();
const axios = require('axios');
let coordinates
let restaurantNames
// let restaurantList

/* GET home page */
router.get('/', (req, res, next) => {
  // here we want to call the api
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
    .then(response => {
      // console.log(response.data.merchants.merchants);
      //console.log(response.data.merchants);
      coordinates = response.data.merchants.map((merchant) => {
        return [
          merchant.location.coordinates.longitude,
          merchant.location.coordinates.latitude
        ]
      });        

      restaurantNames = response.data.merchants.map((merchant) => {  
        // let newObject = {name, id, long,lat}
        let newObject = {}
        Object.assign( newObject ,[
          merchant.name,
          merchant.id,
          merchant.location.coordinates.longitude,
          merchant.location.coordinates.latitude
        ])
        // console.log(newObject);
        return newObject

      }); 

      const restaurantList = response.data.merchants;
      // console.log(restaurantList)
      res.render('index', { restaurantList })
    })
});


router.get('/rawdataCoordinates', (req,res,next) => {
  // console.log(coordinates);
  return res.json (coordinates)
});


router.get('/rawdatarestaurantNames', (req,res,next) => {
  // console.log(restaurantNames);
  return res.json (restaurantNames)
});


router.get ('/' , (req,res,next) => {
  const loggedinUser = req.session.user;
  console.log({ loggedinUser });
  res.render('index', { user: loggedinUser });
});

const loginCheck = () => {
  return (req, res, next) => {
    // if the user is logged in we proceed as intended (call next())
    if (req.session.user) {
      next();
    } else {
      // if user is not logged in we redirect to login
      res.redirect('/login');
    }
  }
}

router.get('/private', loginCheck(), (req, res, next) => {
  res.render('private');
});

router.get('/restaurantDetails/:id',(req,res,next) => {
  const restaurantId = req.params.id;
  axios.get(`https://api.quandoo.com/v1/merchants/${restaurantId}`)
  .then(response => {
    //console.log(response.data.name);
    const restaurantDetails = response.data
    console.log(restaurantDetails);
    res.render('restaurantDetails' , {restaurantDetails});
   })
})

// router.get('/search', (req,res, next) => {
//   res.render ('search')
//   axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//     .then(response => {
//       coordinates = response.data.merchants.map((merchant) => {
//         return [
//           merchant.location.coordinates.longitude,
//           merchant.location.coordinates.latitude
//         ]
//       });
//  restaurantNames = response.data.merchants.map((merchant) => {
//     return [
//       merchant.name,
//       merchant.location.coordinates.longitude,
//       merchant.location.coordinates.latitude
//     ]
//     });
//     const restaurantList = response.data.merchants;
//     res.render('search', { restaurantList })
//   });
// });

module.exports = router;
