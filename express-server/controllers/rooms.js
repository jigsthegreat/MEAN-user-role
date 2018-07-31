const Room = require('../models/Room');
const Reservation = require('../models/Reservation');

exports.getRooms = (req, res, next) => {
  if (req.query.sdt) {
    const roomName = req.query.q ? req.query.q : '';
    // Current algo:
    // 1st: find reservations from the given Start and End Time (to find collision)
    // 2nd: Get the rooms used
    // 3rd: Exclude them on the final search for rooms
    Reservation.find(
      {
        // db.inventory.find( { tags: ["red", "blank"] } ) ::::NOTE::::
        // add open/close reservation?
        approvalStatus: 2,
        startDateTime: { $lt: req.query.edt },
        endDateTime: { $gt: req.query.sdt }
      },
      { room: 1, _id: 0 }
    )
      .populate('room')
      .then(reservations => {
        console.log(reservations);
        let rooms = reservations.map(item => {
          return item['room']._id;
        });
        console.log(rooms);

        Room.find({
          _id: { $nin: rooms },
          availability: true,
          name: { $regex: roomName, $options: 'i' }
        })
          .then(results => {
            return res.status(200).json({
              usedRooms: reservations,
              availableRooms: results
            });
          })
          .catch(errors => {
            console.log(errors);
          });
      })
      .catch(errors => {
        console.log(errors);
      });
  }
  // default (no query strings)
  else {
    Room.find()
      .then(rooms => {
        res.status(200).json(rooms);
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Fetching rooms failed!'
        });
      });
  }
};

exports.createRoom = (req, res, next) => {
  const room = new Room({
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    availability: req.body.availability
  });
  room
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Room Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Invalid authentication credentials!'
      });
    });
};

exports.updateRoom = (req, res, next) => {
  const room = new Room({
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    availability: req.body.availability
  });
  Room.updateOne({ _id: req.params.id }, room)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: "Couldn't update room!"
      });
    });
};

exports.getRoom = (req, res, next) => {
  Room.findById(req.params.id)
    .then(room => {
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: 'Room not found!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching room failed!'
      });
    });
};

exports.deleteRoom = (req, res, next) => {
  Room.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Room deleted!' });
      } else {
        res.status(401).json({ message: 'Room not found!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching rooms failed!'
      });
    });
};
