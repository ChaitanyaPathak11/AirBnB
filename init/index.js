const mongoose = require('mongoose');
const data = require("./data.js");
const Listing = require("./models/listing.js");

async function main()
{
    await mongoose.connect(MONGO_URL);
};

main().then(() => 
{
    console.log("Successfully connected to database.");
})
.catch((err) =>
{
    console.log("Error while connecting to database.");
    console.log(err);
});

const initDB = async () => 
{
    await Listing.deleteMany({});
    await Listing.in
}
