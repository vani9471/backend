/**
 * Checks if a specific assignment conflicts with existing schedules.
 * @param {Array} currentSchedule - The array of already assigned slots.
 * @param {Object} newSlot - The slot we want to add { day, startTime, endTime, faculty, room, subject }.
 * @returns {Object} { hasConflict: boolean, message: string }
 */
const checkConflict = (currentSchedule, newSlot) => {
    for (const slot of currentSchedule) {
        // Only check same day
        if (slot.day === newSlot.day) {
            const timeOverlap =
                (newSlot.startTime >= slot.startTime && newSlot.startTime < slot.endTime) ||
                (newSlot.endTime > slot.startTime && newSlot.endTime <= slot.endTime) ||
                (slot.startTime >= newSlot.startTime && slot.startTime < newSlot.endTime);

            if (timeOverlap) {
                // Same Faculty Conflict
                if (slot.faculty.toString() === newSlot.faculty.toString()) {
                    return {
                        hasConflict: true,
                        message: `Faculty is already assigned to another class during this time.`,
                    };
                }

                // Same Room Conflict
                if (slot.room.toString() === newSlot.room.toString()) {
                    return {
                        hasConflict: true,
                        message: `Room is already occupied by another class during this time.`,
                    };
                }
            }
        }
    }
    return { hasConflict: false };
};

module.exports = { checkConflict };
