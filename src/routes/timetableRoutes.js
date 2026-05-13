const express = require('express');
const {
    generateTimetable,
    getTimetables,
} = require('../controllers/timetableController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getTimetables);

router
    .route('/generate')
    .post(authorize('admin'), generateTimetable);

module.exports = router;
