const { response } = require("express");
const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb
    .getDb()
    .db("hotel-transylvania")
    .collection("guest")
    .find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid guest ID to find a guest.");
        return; // Exit early if the ID is not valid
    }

    const userId = new ObjectId(req.params.id);
    const collection = mongodb.getDb().db("hotel-transylvania").collection("guest");

    const result = await collection.findOne({ _id: userId });

    if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } else {
        res.status(404).json("Guest not found")
    }
};

module.exports = { getAll, getSingle };