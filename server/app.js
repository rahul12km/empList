const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");


app.use(cors());
app.use(express.json());
const ConnectDB = require("./config/db");

ConnectDB();
app.use(express.urlencoded({ extended: true }));

app.use("/user",userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
