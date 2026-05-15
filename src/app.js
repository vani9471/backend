const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const roomRoutes = require('./routes/roomRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const questionRoutes = require('./routes/questionRoutes');
const mockExamRoutes = require('./routes/mockExamRoutes');
const previousPaperRoutes = require('./routes/previousPaperRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Middleware
app.use(cors()); // Allow all origins for public access
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/mock-exams', mockExamRoutes);
app.use('/api/previous-papers', previousPaperRoutes);
app.use('/api/uploads', uploadRoutes);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware can be added here

module.exports = app;
