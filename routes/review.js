const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });


const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");


const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const reviewController=require("../controllers/reviews.js");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");


// ✅ CREATE REVIEW
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


// ✅ DELETE REVIEW
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview));
  
module.exports = router;
