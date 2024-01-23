// itemsController.js

import express from 'express';
import FoodItems from '../Models/FoodItems.js';
import mongoose from 'mongoose';

const router = express.Router();

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await FoodItems.find();
        res.json({ success: true, message: 'Products retrieved successfully.', data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get a single product by ID
router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const product = await FoodItems.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, message: 'Product retrieved successfully.', data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route to add a new product
router.post('/products', async (req, res) => {
    const { Name, Price, ImageUrl, IsPopular, IsRecommended } = req.body;

    try {
        // Validate request body
        if (!Name || typeof Price !== 'number' || !ImageUrl || typeof IsPopular !== 'boolean' || typeof IsRecommended !== 'boolean') {
            return res.status(400).json({ success: false, message: 'Invalid request body. Make sure all required fields are provided and have correct data types.' });
        }

        const newProduct = new FoodItems({
            Name,
            Price,
            ImageUrl,
            IsPopular,
            IsRecommended,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({ success: true, message: 'Product added successfully.', data: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        // Check if the provided ID is valid
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID.' });
        }

        // Find the product by ID and delete it
        const deletedProduct = await FoodItems.findByIdAndDelete(productId);

        // Check if the product was found and deleted
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.json({ success: true, message: 'Product deleted successfully.', data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
