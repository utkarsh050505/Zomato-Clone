import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map((item) => {

        });

        res.json({success:true,session_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`});

    } catch (error) {
        console.log(error);
        res.json("Error");
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"});
        }
        else {
            orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Listing order for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success:true, message:"Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};