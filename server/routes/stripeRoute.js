import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeRoute = express.Router();

const calculateDiscount = (amount) => {
    let discount = 0;
    if (amount >= 5000 && amount < 10000) {
        discount = Math.round(amount * 0.03); // 3% kedvezmény
    } else if (amount >= 10000) {
        discount = Math.round(amount * 0.06); // 6% kedvezmény
    }
    return discount;
}




const stripePayment = async (req, res) => {
    const data = req.body;

    let lineItems = [];
    let subtotal = 0;

    data.cartItems.forEach((item) => {
        subtotal += item.price * item.qty;
        lineItems.push({
            price: item.stripeId,
            quantity: item.qty,
        });
    });

    const discount = calculateDiscount(subtotal);
    const totalAmount = subtotal - discount;
    const totalPrice = Math.floor(totalAmount / 5) * 5;
    console.log(totalPrice)
    const order = new Order({
        orderItems: data.cartItems,
        user: data.userInfo._id,
        username: data.userInfo.name,
        email: data.userInfo.email,
        shippingAddress: data.shippingAddress,
        shippingPrice: data.shipping,
        subtotal: subtotal,
        totalPrice: totalPrice.toFixed(2),
    });

    const newOrder = await order.save(); // A rendelés mentése az adatbázisba

    let orderId = newOrder._id.toString();

    data.cartItems.forEach(async (cartItem) => {
        let product = await Product.findById(cartItem.id);
        product.stock = product.stock - cartItem.qty;
        product.save();
    });

    // Fizetési opció alapján döntjük el a success_url értékét
    const successUrl = 'http://localhost:3000/success'; // Módosítás: Átirányítás az /success oldalra

    // Stripe fizetési munkamenet létrehozása kikommentelve

    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     billing_address_collection: 'required',
    //     line_items: [{
    //         price_data: {
    //             currency: 'huf',
    //             unit_amount: totalAmount * 100, // A fizetendő összeg centekben
    //             product_data: {
    //                 name: 'Fizetés',
    //             },
    //         },
    //         quantity: 1,
    //     }],
    //     mode: 'payment',
    //     success_url: successUrl, 
    //     cancel_url: 'http://localhost:3000/cancel',
    // });

    res.send(
        JSON.stringify({
            orderId: orderId,
             url: successUrl, 
        })
    );
};

stripeRoute.route('/').post(protectRoute, stripePayment);

export default stripeRoute;
