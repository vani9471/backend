const express = require('express');
const {
    getPreviousPapers,
    createPreviousPaper,
    deletePreviousPaper,
} = require('../controllers/previousPaperController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPreviousPapers);

router.post('/', protect, authorize('admin', 'faculty'), createPreviousPaper);

router
    .route('/:id')
    .delete(protect, authorize('admin', 'faculty'), deletePreviousPaper);

module.exports = router;
