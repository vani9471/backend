const Question = require('../models/Question');

// @desc    Get questions for a subject
// @route   GET /api/questions
// @access  Private
exports.getQuestions = async (req, res) => {
    try {
        const { subject, unit, marks, type } = req.query;
        let query = {};
        
        if (subject) query.subject = subject;
        if (unit) query.unit = unit;
        if (marks) query.marks = marks;
        if (type) query.type = type;

        const questions = await Question.find(query);
        res.status(200).json({ success: true, count: questions.length, data: questions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create question
// @route   POST /api/questions
// @access  Private/Faculty/Admin
exports.createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private/Faculty/Admin
exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private/Faculty/Admin
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
