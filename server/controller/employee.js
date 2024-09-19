const Employee = require('../model/employee.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const createEmployeeController = async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const profileImageURL = req.file ? path.basename(req.file.path) : null;

    try {
        if (!name || !email || !mobile || !designation || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (! /^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: 'Mobile number must be 10 digits' });
        }

        if (!['hr', 'manager', 'sales'].includes(designation)) {
            return res.status(400).json({ message: 'Invalid designation' });
        }

        if (!['male', 'female'].includes(gender)) {
            return res.status(400).json({ message: 'Invalid gender' });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            profileImageURL
        });

        await newEmployee.save();

        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateEmployeeController = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    const profileImageURL = req.file ? path.basename(req.file.path) : null;

    try {
        if (!name || !email || !mobile || !designation || !gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (! /^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (! /^\d{10}$/.test(mobile)) {
            return res.status(400).json({ message: 'Mobile number must be 10 digits' });
        }

        if (!['hr', 'manager', 'sales'].includes(designation)) {
            return res.status(400).json({ message: 'Invalid designation' });
        }

        if (!['male', 'female'].includes(gender)) {
            return res.status(400).json({ message: 'Invalid gender' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                name,
                email,
                mobile,
                designation,
                gender,
                course,
                ...(profileImageURL && { profileImageURL }) // Only update profile image if a new one is uploaded
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteEmployeeController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Construct the absolute path to the profile image
        if (deletedEmployee.profileImageURL) {
            const filePath = path.join(uploadDirectory, deletedEmployee.profileImageURL);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting profile image:', err);
                }
            });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const getAllEmployeesController = async (req, res) => {
    try {
        const employees = await Employee.find();

        if (!employees || employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const getEmployeeByIdController = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ employee });
    } catch (error) {
        console.error('Error fetching employee by ID:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { createEmployeeController, deleteEmployeeController, updateEmployeeController, getAllEmployeesController,getEmployeeByIdController, upload };
