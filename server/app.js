const express = require("express");
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const employeeRouter = require("./routes/employee");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
const ConnectDB = require("./config/db");

ConnectDB();
app.use(express.urlencoded({ extended: true }));

app.use("/user",userRouter);
app.use("/employee",employeeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
