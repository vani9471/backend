const PreviousPaper = require('../models/PreviousPaper');

// @desc    Get previous papers for a subject
// @route   GET /api/previous-papers
// @access  Private
exports.getPreviousPapers = async (req, res) => {
    try {
        const { subject, year, type } = req.query;
        let query = {};
        
        if (subject) query.subject = subject;
        if (year) query.year = year;
        if (type) query.type = type;

        const papers = await PreviousPaper.find(query).populate('subject', 'name code');
        res.status(200).json({ success: true, count: papers.length, data: papers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create previous paper
// @route   POST /api/previous-papers
// @access  Private/Faculty/Admin
exports.createPreviousPaper = async (req, res) => {
    try {
        const paper = await PreviousPaper.create({
            ...req.body,
            uploadedBy: req.user.id
        });
        res.status(201).json({ success: true, data: paper });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete previous paper
// @route   DELETE /api/previous-papers/:id
// @access  Private/Faculty/Admin
exports.deletePreviousPaper = async (req, res) => {
    try {
        const paper = await PreviousPaper.findByIdAndDelete(req.params.id);
        if (!paper) {
            return res.status(404).json({ success: false, message: 'Paper not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
