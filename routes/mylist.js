const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const MyList = require('../models/MyList');


router.get('/mylist', async (req, res, next) => {
  try {
      const { _id, restaurants: myRestaurants } = await MyList.findOne({userId: req.session.user._id});
      const restaurants = await Promise.all(
          myRestaurants.map(fetchRestaurant),
      );
      const loggedinUser = req.session.user;
      if (req.session.user) {
        res.render('./restaurants/mylist', { result: [{_id, restaurants}] , user: loggedinUser});
      } else {
        res.render('./restaurants/mylist', { result: [{_id, restaurants}] , user: loggedinUser});
      }
  } catch (error) {
      next(error);
  }
});


async function fetchRestaurant({ _id, restaurantId, comment }) {
  try {
    const url = `https://api.quandoo.com/v1/merchants/${restaurantId}`;
    console.log(url);
    const { data: restaurant } = await axios.get(url);
    return {
      _id,
      restaurant,
      comment,
    };
  } catch (error) {
    if (error.response) {
      const {
        status,
        data: serverResponse = 'No server response',
      } = error.response;
      if (!status) {
        throw new Error(`Did not receive http code from server: ${serverResponse}`);
      }
      throw new Error(serverResponse);
    } else if (error.request) {
      throw new Error(`No server response: ${error.message}`);
    } else {
      throw new Error(`Failed to execute request: ${error.message}`);
    }
  }
}

router.post('/mylist/add/:id',(req,res,next) => {
  const restaurantId = req.params.id;
  const comment = req.body.comments;
  const user = req.session.user;
  //console.log(restaurantId, comment, user);

  MyList.findOne({userId: req.session.user._id})
  .then(myLists => {
    if (!myLists) {
      MyList.create({ userId: user._id, restaurants: [
        {        
          comment: comment,
          restaurantId: restaurantId }
      ] 
      })
        .then(() => {
            res.redirect('/mylist')
        })
        .catch(err => {
            next(err);
        });
    } else {
      const restaurantExists = myLists.restaurants.reduce((prev, curr) => {
        if (curr.restaurantId === restaurantId) {
          prev = true;
        }
        return prev;
      }, false);

      if (restaurantExists) {
        return res.redirect('/mylist')
      }

      myLists.restaurants.push({
        comment: comment,
        restaurantId: restaurantId
      });
  
      MyList.updateOne(myLists)
      .then(() => {
        res.redirect('/mylist')
      })
      .catch(err => {
          next(err);
      });
    }
  })
  .catch(err => {
    next(err);
  });
})

router.get('/mylist/delete/:id', (req, res) => {
  MyList.findOne({userId: req.session.user._id})
  .then(myLists => {
    if (!myLists) {
      res.redirect('/mylist');
    } else {
      myLists.restaurants = myLists.restaurants.filter(r => r.restaurantId !== req.params.id);
      console.log('fuck',req.params.id,myLists);

      MyList.updateOne(myLists)
      .then(() => {
        res.redirect('/mylist')
      })
      .catch(err => {
          next(err);
      });
    }
  })
  .catch(err => {
    next(err);
  });
});

router.post('/mylist/edit/:id',(req,res,next) => {
  const restaurantId = req.params.id;
  const comment = req.body.comments;
  const user = req.session.user;
  //console.log(restaurantId, comment, user);

  MyList.findOne({userId: req.session.user._id})
    .then(myLists => {
      console.log(myLists);
      myLists.restaurants.map((restaurant) => {
        if (restaurant.restaurantId === req.params.id){
          restaurant.comment = req.body.comment;
        }
        return restaurant;
      });
  
      MyList.updateOne(myLists)
      .then(() => {
        res.redirect('/mylist')
      })
      .catch(err => {
          next(err);
      });
  })
  .catch(err => {
    next(err);
  });
})


module.exports = router;
