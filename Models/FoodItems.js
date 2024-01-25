import mongoose from "mongoose";

const ItemsSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    ImageUrl: String,
    Description: String,
    Category: String,
    Rating: Number,
    IsPopular: Boolean,
    IsRecommended: Boolean,
});

const FoodItems = mongoose.model('FoodItems', ItemsSchema);
export default FoodItems;