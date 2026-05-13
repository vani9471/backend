const Faculty = require('../models/Faculty');
const User = require('../models/User');

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Private
exports.getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find()
            .populate('user', 'name email')
            .populate('department', 'name code');
        res.status(200).json({ success: true, count: faculty.length, data: faculty });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create/Update faculty profile
// @route   POST /api/faculty
// @access  Private/Admin
exports.upsertFaculty = async (req, res) => {
    try {
        const { userId, department, designation, specialization, maxWorkload } = req.body;

        // Check if user exists and is a teacher
        const user = await User.findById(userId);
        if (!user || user.role !== 'teacher') {
            return res.status(400).json({ success: false, message: 'Invalid teacher user' });
        }

        let faculty = await Faculty.findOne({ user: userId });

        if (faculty) {
            // Update
            faculty = await Faculty.findOneAndUpdate(
                { user: userId },
                req.body,
                { new: true, runValidators: true }
            );
        } else {
            // Create
            faculty = await Faculty.create(req.body);
        }

        res.status(200).json({ success: true, data: faculty });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
// @access  Private/Admin
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) {
            return res.status(404).json({ success: false, message: 'Faculty profile not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
