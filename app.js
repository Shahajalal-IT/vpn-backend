require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

// Configure Mongoose to Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((response) => {
        console.log("MongoDB Connected Successfully.");
    })
    .catch((err) => {
        console.log("Database connection failed.");
    });

// Configure Express
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use("/uploads", express.static(path.join("uploads")));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(cors());

/* Routes */
const api = require("./routes/api");

app.use("/api", api);

/* Start The Server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});