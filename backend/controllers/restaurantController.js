import restaurantModel from "../models/restaurantModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";

const createRestaurant = async (req, res) => {
  try {
    const { name, address, description, phone } = req.body;
    const image = req.file ? req.file.filename : undefined;

    // Create new restaurant with the logged-in user as owner.
    const newRestaurant = new restaurantModel({
      name,
      address,
      description,
      phone,
      image,
      owner: req.user._id,
    });

    await newRestaurant.save();
    res.json({ success: true, message: "Restaurant created", data: newRestaurant });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.json({ success: false, message: "Error creating restaurant" });
  }
};

/**
 * Get a restaurant by ID, populated with its menu (via the virtual field).
 * The :id parameter is the restaurant _id.
 */
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id).populate("menu");
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error retrieving restaurant:", error);
    res.json({ success: false, message: "Error retrieving restaurant" });
  }
};

/**
 * Update restaurant details.
 * Only the owner of the restaurant (as determined by req.user) can update it.
 * Accepts new values in req.body and an optional new image (req.file).
 */
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    // Check that the logged-in user is the owner
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json({ success: true, message: "Restaurant updated", data: updatedRestaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.json({ success: false, message: "Error updating restaurant" });
  }
};

const addFoodToRestaurant = async (req, res) => {
  try {
    // Find the restaurant owned by the logged-in user.
    const restaurant = await restaurantModel.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found for the owner" });
    }

    let image_filename = req.file ? req.file.filename : undefined;
    const newFood = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
      restaurant: restaurant._id, // tie this food to the owner’s restaurant
    });

    await newFood.save();
    res.json({ success: true, message: "Food added to restaurant menu", data: newFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

const removeFoodFromRestaurant = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Find the restaurant for the logged-in user.
    const restaurant = await restaurantModel.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found for the owner" });
    }

    // Ensure that the food belongs to this restaurant.
    if (food.restaurant.toString() !== restaurant._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // Remove the food image file if it exists.
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error("Error deleting food image:", err);
      });
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed from restaurant menu" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};

const listRestaurantOrders = async (req, res) => {
  try {
    // Find the restaurant owned by the logged-in user.
    const restaurant = await restaurantModel.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    // Find orders that belong to this restaurant.
    const orders = await orderModel.find({ restaurant: restaurant._id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    // Find the restaurant owned by the logged-in user.
    const restaurant = await restaurantModel.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    const order = await orderModel.findById(req.body.orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Verify that the order belongs to this restaurant.
    if (order.restaurant.toString() !== restaurant._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    order.status = req.body.status;
    await order.save();
    res.json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: "Error updating order status" });
  }
};

export {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  addFoodToRestaurant,
  removeFoodFromRestaurant,
  listRestaurantOrders,
  updateOrderStatus,
};