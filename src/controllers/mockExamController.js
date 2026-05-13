const MockExam = require('../models/MockExam');
const Result = require('../models/Result');

// @desc    Get mock exams for a subject
// @route   GET /api/mock-exams
// @access  Private
exports.getMockExams = async (req, res) => {
    try {
        const { subject } = req.query;
        let query = {};
        if (subject) query.subject = subject;

        const mockExams = await MockExam.find(query).populate('questions');
        res.status(200).json({ success: true, count: mockExams.length, data: mockExams });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single mock exam
// @route   GET /api/mock-exams/:id
// @access  Private
exports.getMockExam = async (req, res) => {
    try {
        const mockExam = await MockExam.findById(req.params.id).populate('questions');
        if (!mockExam) {
            return res.status(404).json({ success: false, message: 'Mock exam not found' });
        }
        res.status(200).json({ success: true, data: mockExam });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Submit mock exam results
// @route   POST /api/mock-exams/:id/submit
// @access  Private
exports.submitMockExam = async (req, res) => {
    try {
        const { answers, score, correctAnswers, totalQuestions } = req.body;
        
        const result = await Result.create({
            user: req.user.id,
            mockExam: req.params.id,
            score,
            totalQuestions,
            correctAnswers,
            answers
        });

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Create mock exam
// @route   POST /api/mock-exams
// @access  Private/Faculty/Admin
exports.createMockExam = async (req, res) => {
    try {
        const mockExam = await MockExam.create(req.body);
        res.status(201).json({ success: true, data: mockExam });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
