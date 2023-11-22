const { response } = require("express");
const mongodb = require("../db/connect");
// const { ObjectId } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

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
  const collection = mongodb
    .getDb()
    .db("hotel-transylvania")
    .collection("guest");

  const result = await collection.findOne({ _id: userId });

  if (result) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res.status(404).json("Guest not found");
  }
};

const createGuest = async (req, res, next) => {
  try {
    const guest = {
      guestID: req.body.guestID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      dateOfBirth: req.body.dateOfBirth,
      identificationConfirmation: req.body.identificationConfirmation,
    };
    const response = await mongodb
      .getDb()
      .db("hotel-transylvania")
      .collection("guest")
      .insertOne(guest);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the contact"
        );
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGuest = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid guest ID to update a guest");
  }
  const userId = new ObjectId(req.params.id);
  const guest = {
    guestID: req.body.guestID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    dateOfBirth: req.body.dateOfBirth,
    identificationConfirmation: req.body.identificationConfirmation,
  };
  const response = await mongodb
    .getDb()
    .db("hotel-transylvania")
    .collection("guest")
    .replaceOne({ _id: userId }, guest);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the contact");
  }
};

const deleteGuest = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid guest id to delete a guest.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("hotel-transylvania")
    .collection("guest")
    .deleteOne({ _id: userId }, true);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some errors occurred while deleting the contact"
      );
  }
};

module.exports = { getAll, getSingle, createGuest, updateGuest, deleteGuest };
