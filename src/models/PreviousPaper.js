const mongoose = require('mongoose');

const previousPaperSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    type: {
        type: String,
        enum: ['Regular', 'Supplementary'],
        default: 'Regular',
    },
    fileUrl: {
        type: String,
        required: true,
    },
    downloadCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('PreviousPaper', previousPaperSchema);
