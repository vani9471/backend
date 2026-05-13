const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subject name is required'],
    },
    code: {
        type: String,
        required: [true, 'Subject code is required'],
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    hoursPerWeek: {
        type: Number,
        required: true,
    },
    isLab: {
        type: Boolean,
        default: false,
    },
    semester: {
        type: Number,
        required: true,
    },
    regulation: {
        type: String,
        required: true,
        default: 'R23',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Subject', subjectSchema);
