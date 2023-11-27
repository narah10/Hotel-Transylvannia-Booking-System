const validator = require('../helpers/validate');

const saveGuest = (req, res, next) => {
    const validationRule = {
      guestID: "required|string",  
      firstName: "required|string",
      lastName: "required|string",
      email: "required|string",
      phone: "required|string",
      dateOfBirth: "required|string",
      address: "required|string",
      dateOfBirth: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
        console.log(req.body);
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveRoom = (req, res, next) => {
    const validationRule = {
        roomNumber: "required|string", 
        description: "required|string",
        features: "required|string",
        pricePerNight: "required|string",
        roomType: "required|string",
        status: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = { saveGuest, saveRoom };