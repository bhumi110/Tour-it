const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Listing=require('./models/listing.js');
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");


app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);


//-------connect to MongoDB-------------
const MONGO_URL="mongodb://127.0.0.1:27017/tourit";
main()
    .then(() => {
        console.log("connected");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);

}

//------------home route----------------
app.get("/",(req,res)=>{
    res.send("Hello World");
});

//----------index route--------
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    console.log("All listings fetched and rendered");
});

//-----new listing route--------
app.get('/listings/new',(req,res)=>{
res.render("listings/new.ejs");
});

//--------show route-----
app.get("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    console.log("Listing details fetched and rendered");
})

//---create route-------
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body);
    await newListing.save();
    console.log("New listing created:",newListing);
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
    console.log("Edit form rendered");
});

//upadate route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect(`/listings/${id}`);
    console.log("Listing updated");
});

//delete route
app.delete('/listings/:id',async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log("Listing deleted");
})


//app.get("/testListing",async(req,res)=>{
//    let sampleListing=new Listing({
//        title:"Cozy Cottage",
//        description:"A cozy cottage in the countryside",
//        price:1200,
//        location:"Countryside",
//        country:"Wonderland",
//    });
//    await sampleListing.save();
//    console.log("Sample listing saved");
//    res.send("Sample listing saved");
//});



app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});