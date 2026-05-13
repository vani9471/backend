const express = require('express');
const {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getQuestions);

router.post('/', protect, authorize('admin', 'faculty'), createQuestion);

router
    .route('/:id')
    .put(protect, authorize('admin', 'faculty'), updateQuestion)
    .delete(protect, authorize('admin', 'faculty'), deleteQuestion);

module.exports = router;
