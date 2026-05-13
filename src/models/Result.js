const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    mockExam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MockExam',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    timeTaken: {
        type: Number, // in seconds
    },
    analysis: {
        weakTopics: [String],
        performance: String,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Result', resultSchema);
