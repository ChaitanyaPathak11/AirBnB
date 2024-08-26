const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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
    console.log("Error while connecting to database");
    console.log(err);
});

app.listen(port, () =>
{
    console.log("App listening succesfully to port 8080...");
});

app.get("/", (req, res) =>
{
    res.send("Hi I am root!");
});

app.get("/testListing", async (req, res) =>
{
    let sampleListing = new Listing(
        {
            title: "My new Villa",
            description: "By the beach",
            price: 1200,
            location: "Goa",
            country: "India",
        }
    );

    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful Testing");
});

