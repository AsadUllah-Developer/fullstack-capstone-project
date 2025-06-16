/*jshint esversion: 8 */
const express = require('express');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../models/db');

const router = express.Router();

// GET /api/gifts – Fetch all gifts
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Retrieve the gift collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts
        const gifts = await collection.find({}).toArray();

        // Task 4: Return the gifts
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET /api/gifts/:id – Fetch a gift by ID
router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB and store connection to db constant
        const db = await connectToDatabase();

        // Task 2: Retrieve the gift collection
        const collection = db.collection("gifts");

        const id = req.params.id;

        // Task 3: Find a specific gift by ID
        const gift = await collection.findOne({ _id: new ObjectId(id) });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// POST /api/gifts – Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const result = await collection.insertOne(req.body);

        res.status(201).json(result.ops ? result.ops[0] : req.body);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
