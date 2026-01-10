const Listing=require("../models/listing");
const Review=require("../models/review");


module.exports.createReview=async (req, res) => {
    const { id } = req.params;

    
    const Review = require("../models/review");   // ✅ dynamic require
    const Listing = require("../models/listing");

    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New review created");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyReview=async (req, res) => {

    const Review = require("../models/review");   // ✅ dynamic require
    const Listing = require("../models/listing");


    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};