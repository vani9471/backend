const mongoose = require('mongoose');

const mockExamSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
        default: 30,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    totalMarks: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MockExam', mockExamSchema);
