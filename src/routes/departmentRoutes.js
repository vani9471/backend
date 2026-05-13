const express = require('express');
const {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes protected

router
    .route('/')
    .get(getDepartments)
    .post(authorize('admin'), createDepartment);

router
    .route('/:id')
    .put(authorize('admin'), updateDepartment)
    .delete(authorize('admin'), deleteDepartment);

module.exports = router;
