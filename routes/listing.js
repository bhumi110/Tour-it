const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require('../models/listing.js');
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");


//----------index route--------
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
    console.log("All listings fetched and rendered");
}));

//-----new listing route--------
router.get('/new', isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//--------show route-----
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:
        {path:"author",},
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
    console.log("Listing details fetched and rendered");
}));

//---create route-------
router.post("/",isLoggedIn, wrapAsync(async (req, res) => {
    //listingSchema.validate(req.body);
    //console.log(result);
    const newListing = new Listing(req.body);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success", "New listing created");
    console.log("New listing created:", newListing);
    res.redirect("/listings");
})
);

//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
    console.log("Edit form rendered");
}));

//upadate route
router.put("/:id",isLoggedIn,isOwner,wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/listings/${id}`);
    req.flash("success", "Listing Updated!");
    console.log("Listing updated");
}));

//delete route
router.delete('/:id',isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Listing Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Listing deleted");
}))

module.exports = router;