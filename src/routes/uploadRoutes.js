const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Upload a file
// @route   POST /api/uploads
// @access  Private/Faculty/Admin
router.post('/', protect, authorize('teacher', 'admin'), upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    res.status(200).json({
        success: true,
        data: {
            fileName: req.file.filename,
            originalName: req.file.originalname,
            filePath: `/uploads/${req.file.filename}`
        }
    });
});

module.exports = router;
