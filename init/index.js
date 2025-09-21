const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const MONGO_URL="mongodb://127.0.0.1:27017/tourit";
main()
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);

}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,owner:"68cf1668043ecb7152cb2de1"
    }));
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};
initDB();