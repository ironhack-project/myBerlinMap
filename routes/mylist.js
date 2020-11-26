const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const MyList = require('../models/MyList');


router.get('/mylist', (req, res, next) => {
  //const restaurantId = req.params.id;
  //console.log(req.session.user);
  MyList.findOne({userId: req.session.user._id}).then(myList => {
    console.log('mylist',myList);
    let restaurants = []

      console.log(myList);
      myList.restaurants.forEach((element, index) => {
        const url = `https://api.quandoo.com/v1/merchants/${element.restaurantId}`;
        console.log(url);
        axios.get(url)
        .then(response => {
          //console.log(response);
          const restaurantDetails = {
            _id: element._id,
            restaurant: response.data,
            comment: element.comment
          }
          //console.log(restaurantDetails);
          restaurants.push(restaurantDetails);
      
          if (index === myList.restaurants.length - 1) {
            // how come res.render sometimes returns only some of the restauarnts in the list, but it works with a
            // waiter timeout. Should work with the if test only. Assume that it has to do with async, but why?
            setTimeout(function(){
              res.render('./restaurants/mylist', { result: [{_id: myList._id, restaurants}] });
            }, 100);
          }
        })
        .catch(err => {
          console.log(err);
          next(err);
        })
      })
  });
});


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