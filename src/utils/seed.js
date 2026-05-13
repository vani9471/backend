const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const User = require('../models/User');
const Faculty = require('../models/Faculty');
const Room = require('../models/Room');

dotenv.config({ path: './.env' });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // 1. Clear Data
        await Department.deleteMany();
        await Subject.deleteMany();
        await Faculty.deleteMany();
        await Room.deleteMany();

        // 2. Create Department
        const dept = await Department.create({
            name: 'Computer Science',
            code: 'CS',
            description: 'Dept of Computer Science & Engineering'
        });

        // 3. Create Subjects
        const sub1 = await Subject.create({
            name: 'Data Structures',
            code: 'CS301',
            department: dept._id,
            credits: 4,
            hoursPerWeek: 4,
            semester: 3
        });

        const sub2 = await Subject.create({
            name: 'Operating Systems',
            code: 'CS302',
            department: dept._id,
            credits: 4,
            hoursPerWeek: 3,
            semester: 3
        });

        const sub3 = await Subject.create({
            name: 'Software Engineering',
            code: 'CS401',
            department: dept._id,
            credits: 3,
            hoursPerWeek: 3,
            semester: 4
        });

        const sub4 = await Subject.create({
            name: 'Java Programming',
            code: 'CS402',
            department: dept._id,
            credits: 4,
            hoursPerWeek: 4,
            semester: 4,
            isLab: true
        });

        const sub5 = await Subject.create({
            name: 'Python Programming',
            code: 'CS403',
            department: dept._id,
            credits: 3,
            hoursPerWeek: 3,
            semester: 4,
            isLab: true
        });

        // 4. Create Teacher User & Faculty Profile
        // Assuming a user with email 'teacher@test.com' exists or creating one
        let user = await User.findOne({ email: 'teacher@test.com' });
        if (!user) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            user = await User.create({
                name: 'Dr. Smith',
                email: 'teacher@test.com',
                password: hashedPassword,
                role: 'teacher'
            });
        }

        await Faculty.create({
            user: user._id,
            department: dept._id,
            designation: 'Professor',
            specialization: ['Algorithms', 'OS']
        });

        // 5. Create Rooms
        await Room.create({
            roomNumber: 'LH-101',
            type: 'Classroom',
            capacity: 60,
            department: dept._id
        });

        await Room.create({
            roomNumber: 'LAB-201',
            type: 'Lab',
            capacity: 30,
            department: dept._id
        });

        console.log('Sample data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
