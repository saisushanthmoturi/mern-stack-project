const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: String,
    image: {
        type: String,
        default:"https://i.pinimg.com/736x/07/cf/b2/07cfb208eb2b477096c999bb93362b2d.jpg",
        set: (v) => v === "" ? "https://i.pinimg.com/736x/07/cf/b2/07cfb208eb2b477096c999bb93362b2d.jpg" : v
    },
    country: String,
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'

        }],
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User",

    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
