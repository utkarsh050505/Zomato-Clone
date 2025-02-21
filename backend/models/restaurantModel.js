import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required."],
    },
    street: {
      type: String,
      required: [true, "Restaurant street is required."],
    },
    area: {
        type: String, 
        required: [true, "Restaurant area is required."],
    },
    city: {
        type: String,
        required: [true, "Restaurant city is required."],
    },
    state: {
        type: String,
        required: [true, "Restaurant state is required."],
    },
    description: {
      type: String,
      required: [true, "Restaurant description is required."],
    },
    phone: {
      type: String,
      required: [true, "Restaurant phone is required."],
    },
    image: {
      type: String,
    },
    email: {
      type:String,
      required:true,
      unique:true
    },
    password: {
      type:String,
      required:true},
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Restaurant owner is required."],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

restaurantSchema.virtual("menu", {
  ref: "food", // the model to use
  localField: "_id", // restaurant _id...
  foreignField: "restaurant", // ...matches the restaurant field in food documents
});

// To populate -> const restaurant = await restaurantModel.findById(restaurantId).populate("menu");

const restaurantModel =
  mongoose.models.restaurant ||
  mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
