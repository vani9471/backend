const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('../models/Subject');
const Department = require('../models/Department');

dotenv.config({ path: './.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gvani');
        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const subjects = [
    // Semester 3
    { name: 'Discrete Mathematics & Graph Theory', code: 'CS301', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Managerial Economics and Financial Analysis', code: 'HS301', semester: 3, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
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
    { name: 'Design Thinking and Innovation', code: 'CS405', semester: 4, regulation: 'R23', credits: 3, hoursPerWeek: 3 },

    // Semester 5
    { name: 'Data Warehousing and Data Mining', code: 'CS501', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Computer Networks', code: 'CS502', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Formal Languages and Automata Theory', code: 'CS503', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Object Oriented Analysis and Design', code: 'CS504', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Artificial Intelligence', code: 'CS505', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Quantum Computing', code: 'CS506', semester: 5, regulation: 'R23', credits: 3, hoursPerWeek: 3 },

    // Semester 6 (Placeholders)
    { name: 'Compiler Design', code: 'CS601', semester: 6, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Machine Learning', code: 'CS602', semester: 6, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Cryptography and Network Security', code: 'CS603', semester: 6, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    
    // Semester 7 (Placeholders)
    { name: 'Cloud Computing', code: 'CS701', semester: 7, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Big Data Analytics', code: 'CS702', semester: 7, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Internet of Things', code: 'CS703', semester: 7, regulation: 'R23', credits: 3, hoursPerWeek: 3 },

    // Semester 8 (Placeholders)
    { name: 'Blockchain Technology', code: 'CS801', semester: 8, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
    { name: 'Cyber Security', code: 'CS802', semester: 8, regulation: 'R23', credits: 3, hoursPerWeek: 3 },
];

const seedData = async () => {
    try {
        await connectDB();

        // Find or create CSE department
        let dept = await Department.findOne({ code: 'CSE' });
        if (!dept) {
            dept = await Department.create({
                name: 'Computer Science and Engineering',
                code: 'CSE',
                description: 'Department of CSE'
            });
            console.log('CSE Department Created');
        }

        // Clear existing R23 subjects
        await Subject.deleteMany({ regulation: 'R23' });
        console.log('Old R23 Subjects Deleted');

        // Add department ID to subjects
        const subjectsWithDept = subjects.map(s => ({ ...s, department: dept._id }));

        await Subject.insertMany(subjectsWithDept);
        console.log(`${subjects.length} Subjects Seeded Successfully`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
