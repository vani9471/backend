const express = require('express');
const {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
} = require('../controllers/subjectController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getSubjects);

router.post('/', protect, authorize('admin', 'teacher'), createSubject);

router
    .route('/:id')
    .put(protect, authorize('admin', 'teacher'), updateSubject)
    .delete(protect, authorize('admin', 'teacher'), deleteSubject);

module.exports = router;
