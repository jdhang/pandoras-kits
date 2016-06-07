var router = require('express').Router();

var db = require('../../db');

var Review= db.model('review');


module.exports = router;

router.param('reviewId', function(req, res,next,id){
	Review.findById(id)
	.then(function(review){
		if (!review) res.sendStatus(404)
		else req.review=review; next();
	})
	.catch(next);
});

router.get('/', function (req, res, next) {
  Review.findAll()
  .then(reviews => res.json(reviews).end())
  .catch(next);
});


router.get('/:reviewId', function (req, res, next) {
  res.send(req.review);
});

router.post('/', function(req, res, next){
	Review.create(req.body)
	.then(review => res.status(201).json(review))
  	.catch(next);
});

router.put('/:reviewId', function(req,res,next){
	req.review.update(req.body)
	.then(review => res.status(200).json(review))
  .catch(next);

});

router.delete('/:reviewId', function(req,res,next){
	req.review.destroy()
	.then(() => res.sendStatus(204))
	.catch(next);
});
