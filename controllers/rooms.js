const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
      const result = await mongodb.getDb().db('hotel-transylvania').collection('rooms').find();
      const lists = await result.toArray();
      console.log(lists);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error while fetching rooms:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports= {getAll}