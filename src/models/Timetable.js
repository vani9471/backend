const mongoose = require('mongoose');

const scheduleItemSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true,
    },
    startTime: {
        type: String, // e.g., "09:00"
        required: true,
    },
    endTime: {
        type: String, // e.g., "10:00"
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
});

const timetableSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        default: 'A',
    },
    academicYear: {
        type: String,
        required: true, // e.g., "2023-24"
    },
    schedule: [scheduleItemSchema],
    isPublished: {
        type: Boolean,
        default: false,
    },
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Timetable', timetableSchema);
