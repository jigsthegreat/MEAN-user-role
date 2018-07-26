const Reservation = require('../models/Reservation');

exports.getReservations = (req, res, next) => {
  Reservation.find()
    .populate('room')
    .populate('requestedBy')
    .then(reservations => {
      res.status(200).json(reservations);
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Fetching reservations failed!'
      });
    });
}

exports.createReservation = (req, res, next) => {
  const reservation = new Reservation({
    room: req.body.room,
    requestedBy: req.body.requestedBy,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime
  });
  reservation
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Reservation Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Invalid authentication credentials!'
      });
    });
}

// exports.updateRoom = (req, res, next) => {
//   const room = new Room({
//     _id: req.body._id,
//     name: req.body.name,
//     description: req.body.description,
//     capacity: req.body.capacity,
//     availability: req.body.availability
//   });
//   Room.updateOne({ _id: req.params.id }, room)
//     .then(result => {
//       if (result.n > 0) {
//         res.status(200).json({ message: 'Update successful!' });
//       } else {
//         res.status(401).json({ message: 'Not authorized!' });
//       }
//     })
//     .catch(error => {
//       return res.status(500).json({
//         message: "Couldn't update room!"
//       });
//     });
// }

// exports.getRoom = (req, res, next) => {
//   Room.findById(req.params.id)
//     .then(room => {
//       if (room) {
//         res.status(200).json(room);
//       } else {
//         res.status(404).json({ message: 'Room not found!' });
//       }
//     })
//     .catch(error => {
//       return res.status(500).json({
//         message: 'Fetching room failed!'
//       });
//     });
// };

// exports.deleteRoom = (req, res, next) => {
//   Room.deleteOne({ _id: req.params.id })
//     .then(result => {
//       if (result.n > 0) {
//         res.status(200).json({ message: 'Room deleted!' });
//       } else {
//         res.status(401).json({ message: 'Room not found!' });
//       }
//     })
//     .catch(error => {
//       return res.status(500).json({
//         message: 'Fetching reservations failed!'
//       });
//     });
// };
