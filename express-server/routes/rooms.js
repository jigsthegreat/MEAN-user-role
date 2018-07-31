const express = require('express');

const RoomController = require('../controllers/rooms');

const router = express.Router();

router.get('', RoomController.getAvailableRooms);

router.get('/all', RoomController.getAllRooms);

router.post('', RoomController.createRoom);

router.put('/:id', RoomController.updateRoom);

router.get('/:id', RoomController.getRoom);

router.delete('/:id', RoomController.deleteRoom);

module.exports = router;
