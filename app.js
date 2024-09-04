const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require('path');
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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


// Index Route
app.get("/listings", async (req, res) =>
{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// Show Route
app.get("/listings/:id", async (req, res) =>
{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// New Route
app.get("/listing/new", (req, res) =>
{
    res.render("listings/new.ejs");
})

// Create Route
app.post("/listings", async (req, res) =>
{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) =>
{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) =>
{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings${id}`); 
});

// Delete Route
app.delete("/listing/:id", async (req, res) =>
{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

// app.get("/testListing", async (req, res) =>
// {
//     let sampleListing = new Listing(
//         {
//             title: "My new Villa",
//             description: "By the beach",
//             price: 1200,
//             location: "Goa",
//             country: "India",
//         }
//     );

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful Testing");
// });

