const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MyList = require('../models/MyList');


router.get('/mylist', (req, res) => {
  res.render('./restaurants/mylist');
});

router.post('/mylist/add/:id',(req,res,next) => {
  const restaurantId = req.params.id;
  const comment = req.body.comments;
  const user = req.session.user;

  console.log(restaurantId,comment, user);

  MyList.create({ userId: user._id, restaurants: [
    {        comment: comment,
      restaurantId: restaurantId }
  ] }).then(() => {
    res.redirect('/mylist')
})
    .catch(err => {
        next(err);
    });

  //console.log(user);
})


module.exports = router;