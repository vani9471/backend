const Timetable = require('../models/Timetable');
const Subject = require('../models/Subject');
const Faculty = require('../models/Faculty');
const Room = require('../models/Room');
const { checkConflict } = require('../utils/conflictDetector');

// Time Slots Configuration
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = [
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '11:00' },
    { start: '11:15', end: '12:15' }, // Break at 11:00
    { start: '12:15', end: '13:15' },
    { start: '14:15', end: '15:15' }, // Lunch break
    { start: '15:15', end: '16:15' },
];

// @desc    Auto-generate timetable
// @route   POST /api/timetables/generate
// @access  Private/Admin
exports.generateTimetable = async (req, res) => {
    try {
        const { department, semester, academicYear, section } = req.body;

        // 1. Fetch required data
        const subjects = await Subject.find({ department, semester });
        const facultyList = await Faculty.find({ department }).populate('user');
        const rooms = await Room.find({ department, type: 'Classroom' });
        const labRooms = await Room.find({ department, type: 'Lab' });

        if (subjects.length === 0 || facultyList.length === 0 || rooms.length === 0) {
            return res.status(400).json({ success: false, message: 'Insufficient data to generate timetable' });
        }

        let schedule = [];
        let facultyWorkload = {}; // Track hours assigned per faculty

        // 2. Clear existing draft for this semester/section
        await Timetable.deleteMany({ department, semester, section, isPublished: false });

        // 3. Simple Greedy Allocation
        for (const subject of subjects) {
            let hoursNeeded = subject.hoursPerWeek;
            let attempts = 0;
            const maxAttempts = 100;

            // Assign a teacher to this subject (Simplification: take first available with least workload)
            // In a real system, we'd check specialization
            const faculty = facultyList[0]; 

            while (hoursNeeded > 0 && attempts < maxAttempts) {
                attempts++;
                const randomDay = DAYS[Math.floor(Math.random() * DAYS.length)];
                const randomSlot = SLOTS[Math.floor(Math.random() * SLOTS.length)];
                const room = subject.isLab ? labRooms[0] : rooms[0];

                if (!room) continue;

                const newSlot = {
                    day: randomDay,
                    startTime: randomSlot.start,
                    endTime: randomSlot.end,
                    subject: subject._id,
                    faculty: faculty._id,
                    room: room._id,
                };

                // Check for conflicts globally (across all sections if needed, but here just this schedule for now)
                // Note: In a full system, checkConflict should check against ALL timetables in the DB for that faculty/room
                const conflict = checkConflict(schedule, newSlot);

                if (!conflict.hasConflict) {
                    schedule.push(newSlot);
                    hoursNeeded--;
                }
            }
        }

        // 4. Save Timetable
        const timetable = await Timetable.create({
            department,
            semester,
            section,
            academicYear,
            schedule,
            generatedBy: req.user.id,
        });

        res.status(201).json({ success: true, data: timetable });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get timetable by dept/semester
// @route   GET /api/timetables
// @access  Private
exports.getTimetables = async (req, res) => {
    try {
        const { department, semester, section } = req.query;
        const query = {};
        if (department) query.department = department;
        if (semester) query.semester = semester;
        if (section) query.section = section;

        const timetables = await Timetable.find(query)
            .populate('department', 'name')
            .populate('schedule.subject', 'name code')
            .populate({
                path: 'schedule.faculty',
                populate: { path: 'user', select: 'name' }
            })
            .populate('schedule.room', 'roomNumber type');

        res.status(200).json({ success: true, data: timetables });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
