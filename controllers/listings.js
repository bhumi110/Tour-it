const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
    console.log("All listings fetched and rendered");
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate:
            { path: "author", },
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
    console.log("Listing details fetched and rendered");
};

module.exports.createListing = async (req, res) => {
    //listingSchema.validate(req.body);
    //console.log(result);
    let url = req.file.path;
    const filename = req.file.filename;
    console.log(url, "..", filename);
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created");
    console.log("New listing created:", newListing);
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
    console.log("Edit form rendered");
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    res.redirect(`/listings/${id}`);
    req.flash("success", "Listing Updated!");
    console.log("Listing updated");
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Listing Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Listing deleted");
};