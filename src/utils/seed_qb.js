const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('../models/Subject');
const Department = require('../models/Department');
const Question = require('../models/Question');
const MockExam = require('../models/MockExam');

dotenv.config({ path: './.env' });

const subjects = [
    // Semester 3
    { name: 'Discrete Mathematics & Graph Theory', code: 'CS301', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Managerial Economics and Financial Analysis', code: 'HM301', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Computer Organization', code: 'CS302', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Advanced Data Structures & Algorithms', code: 'CS303', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Database Management Systems', code: 'CS304', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Python Programming', code: 'CS305', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    
    // Semester 4
    { name: 'Probability and Statistics', code: 'BS401', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Operating Systems', code: 'CS401', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Object Oriented Programming Through Java', code: 'CS402', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Software Engineering', code: 'CS403', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Full Stack Development', code: 'CS404', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Design Thinking and Innovation', code: 'HM401', semester: 4, regulation: 'R23', credits: 2, hoursPerWeek: 2 },

    // Semester 5
    { name: 'Data Warehousing and Data Mining', code: 'CS501', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Computer Networks', code: 'CS502', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Formal Languages and Automata Theory', code: 'CS503', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Object Oriented Analysis and Design', code: 'CS504', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Artificial Intelligence', code: 'CS505', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Quantum Computing', code: 'CS506', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Get a department ID (assume CSE exists or create one)
        let dept = await Department.findOne({ code: 'CSE' });
        if (!dept) {
            dept = await Department.create({ name: 'Computer Science and Engineering', code: 'CSE' });
        }

        // Clear existing subjects for these codes to avoid duplicates
        const codes = subjects.map(s => s.code);
        await Subject.deleteMany({ code: { $in: codes } });

        const createdSubjects = await Subject.insertMany(
            subjects.map(s => ({ ...s, department: dept._id }))
        );
        console.log(`${createdSubjects.length} subjects seeded.`);

        // Add some sample questions for DBMS (CS304)
        const dbms = createdSubjects.find(s => s.code === 'CS304');
        if (dbms) {
            const sampleQuestions = [
                { subject: dbms._id, unit: 1, text: 'What is a Database Management System?', marks: 2, type: 'Important' },
                { subject: dbms._id, unit: 1, text: 'Explain the three-schema architecture of DBMS.', marks: 10, type: 'Semester' },
                { subject: dbms._id, unit: 1, text: 'Define Data Independence.', marks: 2, type: 'Mid' },
                { subject: dbms._id, unit: 2, text: 'What is an Entity-Relationship model?', marks: 5, type: 'Expected' },
                { subject: dbms._id, unit: 2, text: 'Draw an ER diagram for a University database.', marks: 10, type: 'Important' },
                // Mock exam questions (MCQs)
                { subject: dbms._id, unit: 1, text: 'Which of the following is not a type of database user?', marks: 2, type: 'Important', options: ['Sophisticated User', 'Native User', 'Application Programmer', 'Casual User'], correctAnswer: 'Native User', isMockOnly: true },
                { subject: dbms._id, unit: 1, text: 'DBMS stands for:', marks: 2, type: 'Important', options: ['Database Management System', 'Data Management System', 'Database Meta System', 'Data Meta System'], correctAnswer: 'Database Management System', isMockOnly: true },
            ];
            await Question.deleteMany({ subject: dbms._id });
            await Question.insertMany(sampleQuestions);
            console.log('Sample questions for DBMS seeded.');

            // Create a Mock Exam
            const mockQs = sampleQuestions.filter(q => q.isMockOnly);
            await MockExam.deleteMany({ subject: dbms._id });
            await MockExam.create({
                subject: dbms._id,
                title: 'DBMS Unit 1 Mock Test',
                duration: 30,
                questions: mockQs.map(q => q._id),
                totalMarks: mockQs.length * 2,
                passingMarks: Math.ceil(mockQs.length * 1)
            });
            console.log('Mock Exam for DBMS created.');
        }

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
