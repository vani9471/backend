const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    unit: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    content: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        enum: [2, 5, 10],
    },
    type: {
        type: String,
        enum: ['Important', 'Expected', 'Previous', 'Mid Exam', 'Semester Exam'],
        default: 'Important',
    },
    isMockOnly: {
        type: Boolean,
        default: false,
    },
    options: [String], // For MCQ
    correctAnswer: String, // For MCQ
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Question', questionSchema);
