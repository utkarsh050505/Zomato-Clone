import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Path `name` is required.'],
  },
  description: {
    type: String,
    required: [true, 'Path `description` is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Path `price` is required.'],
  },
  category: {
    type: String,
    required: [true, 'Path `category` is required.'],
  },
  image: {
    type: String,
    required: [true, 'Path `image` is required.'],
  },
  // Associate each food item with a restaurant
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: [true, "Every food item must belong to a restaurant."],
  }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
