const express = require('express');
const {
    getMockExams,
    getMockExam,
    submitMockExam,
    createMockExam,
} = require('../controllers/mockExamController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getMockExams)
    .post(authorize('admin', 'faculty'), createMockExam);

router.get('/:id', getMockExam);
router.post('/:id/submit', submitMockExam);

module.exports = router;
