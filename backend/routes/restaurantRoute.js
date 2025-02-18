import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  addFoodToRestaurant,
  removeFoodFromRestaurant,
  listRestaurantOrders,
  updateOrderStatus,
} from "../controllers/restaurantController.js";

// Set up multer storage configuration for image uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create the restaurant router
const restaurantRouter = express.Router();

/**
 * Create a new restaurant.
 * Endpoint: POST /restaurant/create
 * Expects fields: name, address, description, phone.
 * Optionally, an image file uploaded with field name "image".
 */
restaurantRouter.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createRestaurant
);

/**
 * Retrieve a restaurant's details (populated with its menu).
 * Endpoint: GET /restaurant/:id
 * :id is the restaurant's _id.
 */
restaurantRouter.get("/:id", authMiddleware, getRestaurant);

/**
 * Update restaurant details.
 * Endpoint: PUT /restaurant/:id
 * Accepts updated fields in req.body and optionally an image file.
 */
restaurantRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateRestaurant
);

/**
 * Add a food item to the restaurant's menu.
 * Endpoint: POST /restaurant/food/add
 * Expects food details in req.body (name, description, price, category) 
 * and an image file uploaded with field name "image".
 * The food item is automatically linked to the restaurant of the logged-in owner.
 */
restaurantRouter.post(
  "/food/add",
  authMiddleware,
  upload.single("image"),
  addFoodToRestaurant
);

/**
 * Remove a food item from the restaurant's menu.
 * Endpoint: DELETE /restaurant/food/remove
 * Expects the food item's id in req.body.id.
 */
restaurantRouter.delete(
  "/food/remove",
  authMiddleware,
  removeFoodFromRestaurant
);

/**
 * List all orders for the restaurant.
 * Endpoint: GET /restaurant/orders
 */
restaurantRouter.get("/orders", authMiddleware, listRestaurantOrders);

/**
 * Update the status of an order.
 * Endpoint: PATCH /restaurant/order/status
 * Expects fields in req.body: orderId and status.
 */
restaurantRouter.patch("/order/status", authMiddleware, updateOrderStatus);

export default restaurantRouter;