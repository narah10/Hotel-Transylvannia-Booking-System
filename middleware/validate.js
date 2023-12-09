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

const saveStaff = (req, res, next) => {
    const validationRule = {
      firstName: "required|string",
      lastName: "required|string",
      role: "required|string",
      email: "required|string",
      phone: "required|string",
      address: "required|string",
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        })
      } else {
        next();
      }
    })
}

const saveService = (req, res, next) => {
  const validationRule = {
    serviceName: "required|string",
    description: "required|string",
    price: "required|string",
    availabilityStatus: "required|string",
    schedule: "required|string",
    location: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next();
    }
  })
}


const saveReservation = (req, res, next) => {
  const validationRule = {
    guestID: "required|string",
    roomID: "required|string",
    checkIn: "required|string",
    checkOut: "required|string",
    totalPrice: "required|string",
    status: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next();
    }
  })
}


module.exports = { saveGuest, saveRoom, saveStaff, saveService, saveReservation };