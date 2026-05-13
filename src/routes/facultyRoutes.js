const express = require('express');
const {
    getFaculty,
    upsertFaculty,
    deleteFaculty,
} = require('../controllers/facultyController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getFaculty)
    .post(authorize('admin'), upsertFaculty);

router
    .route('/:id')
    .delete(authorize('admin'), deleteFaculty);

module.exports = router;
