const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema(
    {
        title:
        {
            type: String,
            required: true,
        },
        description:
        {
            type: String,
        },
        image:
        {
            type: String,
            default: "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) =>
                v === "" ? "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                : v,
        },
        price:
        {
            type: Number,
        },
        location:
        {
            type: String,
        },
        country:
        {
            type: String,
        }
    }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

