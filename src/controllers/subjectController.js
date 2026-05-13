const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Private
exports.getSubjects = async (req, res) => {
    try {
        const { regulation, semester } = req.query;
        let query = {};
        
        if (regulation) query.regulation = regulation;
        if (semester) query.semester = Number(semester);

        const subjects = await Subject.find(query).populate('department', 'name code');
        res.status(200).json({ success: true, count: subjects.length, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create subject
// @route   POST /api/subjects
// @access  Private/Admin
exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json({ success: true, data: subject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
