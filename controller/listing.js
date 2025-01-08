const Listing= require("../models/listing.js")

module.exports.index = async (req, res) => {
    const allistings = await Listing.find({});
    res.render("listings/index.ejs", { allistings });
}

module.exports.renderNewForm = (req, res) => {
    
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for doesnot exist");
        res.redirect("/listings");
        }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
    };

module.exports.createListing = async (req, res,next) => {
    
        
    let newListing =new  Listing(req.body.listing);
    newListing.owner = req.user._id;
    
    await newListing.save();
    req.flash("success","Listing created successfully");
    res.redirect("/listings");



};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for doesnot exist");
        res.redirect("/listings");
        }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing=async (req, res) => {
        

    let { id } = req.params;
    
    let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file!=="undefined"){
    let url=req.file.path;
    let filename= req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }


    req.flash("success", "Listing updated successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted successfully");
    res.redirect("/listings");
};