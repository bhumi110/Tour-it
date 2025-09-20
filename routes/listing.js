const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require('../models/listing.js');

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

//----------index route--------
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    console.log("All listings fetched and rendered");
}));

//-----new listing route--------
router.get('/new',wrapAsync(async(req,res)=>{
res.render("listings/new.ejs");
}));

//--------show route-----
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
    if(!listing) {
        req.flash("error","Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    console.log("Listing details fetched and rendered");
}));

//---create route-------
router.post("/", wrapAsync(async(req,res)=>{
    //listingSchema.validate(req.body);
    //console.log(result);
    const newListing=new Listing(req.body);
    await newListing.save();
    req.flash("success","New listing created");
    console.log("New listing created:",newListing);
    res.redirect("/listings");
    })
);

//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listing you requested for does not exist!");
        req.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
    console.log("Edit form rendered");
}));

//upadate route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/listings/${id}`);
     req.flash("success","Listing Updated!");
    console.log("Listing updated");
}));

//delete route
router.delete('/:id',wrapAsync(async(req,res)=>{
    let {id}=req.params;
    req.flash("success","Listing Deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Listing deleted");
}))

module.exports=router;