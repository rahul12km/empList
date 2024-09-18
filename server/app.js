const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
