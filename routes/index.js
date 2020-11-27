const express = require('express');
const router  = express.Router();
const axios = require('axios');
let coordinates

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}


router.get('/', (req, res, next) => {
  const loggedinUser = req.session.user;
  axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
    .then(response => {
      coordinates = response.data.merchants.map((merchant) => {
        return [
          merchant.location.coordinates.longitude,
          merchant.location.coordinates.latitude
        ]
      });        
      const restaurantList = response.data.merchants;
      //added login check details here as adding call directly to get blocked entire page
      //probably can be prettier
      // if (req.session.user) {
      //   res.render('index', { restaurantList , user : loggedinUser })
      // } else {
        res.render('index', { restaurantList , user : loggedinUser })
    // }
  })
});


router.get('/rawdataCoordinates', (req,res,next) => {
  return res.json (coordinates)
});

router.get('/restaurantDetails/:id', (req,res,next) => {
  const restaurantId = req.params.id;
  const loggedinUser = req.session.user;
  axios.get(`https://api.quandoo.com/v1/merchants/${restaurantId}`)
  .then(response => {
    //console.log(response.data.name);
    const restaurantDetails = response.data
    console.log(restaurantDetails);
    // if (req.session.user) {
    //   res.render('restaurantDetails' , {restaurantDetails,  user : loggedinUser } );
    // }else {
      res.render('restaurantDetails' , {restaurantDetails, user : loggedinUser } );
    // }
   })
})
//with log in check

// if (req.session.user) {
//   next();
// } else {
//   res.redirect('/login');
// }

// router.get('/search',(req,res, next) => {

//   if (req.session.user) {
//     axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//       .then(response => {
//         const restaurantList = response.data.merchants;
//         const loggedinUser = req.session.user;
//         res.render('search', { restaurantList, user: loggedinUser })
//       }
//     } else {
//     axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//       .then(response => {
//       const restaurantList = response.data.merchants;
//       const loggedinUser = req.session.user;
//       res.render('search', { restaurantList, user: loggedinUser })
//       }
//   }

  
//   // axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
//   //   .then(response => {
//   //   const restaurantList = response.data.merchants;
//   //   const loggedinUser = req.session.user;
//   //   res.render('search', { restaurantList })
//   });
// });


router.get('/search',(req,res, next) => {
  const loggedinUser = req.session.user;
  if (req.session.user) {
    axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
      .then(response => {
        const restaurantList = response.data.merchants;
        const loggedinUser = req.session.user;
        res.render('search', { restaurantList, user: loggedinUser })
    });
  // res.render ('search',  {user: loggedinUser })
  } else{
    axios.get('https://api.quandoo.com/v1/merchants?place=Berlin&radius=10&capacity=2&offset=0&limit=10000')
      .then(response => {
        const restaurantList = response.data.merchants;
        const loggedinUser = req.session.user;
        res.render('search', { restaurantList, user: loggedinUser })
    });
  }
});



//routes requiring loginCheck=======================
router.get('/private', loginCheck(), (req, res, next) => {
  res.render('private');
});


module.exports = router;
