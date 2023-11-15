const { response } = require("express");
const mongodb = require("../db/connect");
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

module.exports = { getAll };