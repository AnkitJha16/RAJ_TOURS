const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// mergeParams = true helps to include the params from other routes also in the current router
const router = express.Router({ mergeParams: true });

// both these routes will be redirected here
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews

router.use(authController.protect);

router.route('/').get(reviewController.getAllReviews).post(
  // authController.protect,
  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview,
);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );

module.exports = router;