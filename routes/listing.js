const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require('../models/listing.js');
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("image.url") ,wrapAsync(listingController.createListing));


//-----new listing route--------
router.get('/new', isLoggedIn, listingController.renderNewForm);

//--------show route-----
router.get("/:id", wrapAsync(listingController.showListing));


//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editListing));

//upadate route
router.put("/:id",isLoggedIn,upload.single("image.url"),isOwner,wrapAsync(listingController.updateListing));

//delete route
router.delete('/:id',isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;