const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controller/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }

}

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,
        wrapAsync(listingController.createListing));
    


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner, validateListing,
    wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;