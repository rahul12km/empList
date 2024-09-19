const express = require('express');
const { createEmployeeController, updateEmployeeController, deleteEmployeeController,getAllEmployeesController,getEmployeeByIdController, upload } = require('../controller/employee');
const router = express.Router();

router.get('/all',getAllEmployeesController);
router. get("/:id",getEmployeeByIdController);
router.post('/create', upload.single('profileImage'), createEmployeeController);
router.put('/update/:id', upload.single('profileImage'), updateEmployeeController);
router.delete('/delete/:id', deleteEmployeeController);

module.exports = router;
