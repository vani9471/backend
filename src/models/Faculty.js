const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    specialization: [String],
    maxWorkload: {
        type: Number,
        default: 18, // max hours per week
    },
    currentWorkload: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Faculty', facultySchema);
