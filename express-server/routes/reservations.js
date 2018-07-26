const express = require('express');

const ReservationController = require('../controllers/reservations');

const router = express.Router();

router.get('', ReservationController.getReservations);

router.post('', ReservationController.createReservation);

// router.put('/:id', ReservationController.updateReservation);

// router.get('/:id', ReservationController.getReservation);

// router.delete('/:id', ReservationController.deleteReservation);

module.exports = router;
