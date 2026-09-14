const express = require("express");

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");

const checkWorkingHours = (req, res, next) => {
    const now = new Date();

    const day = now.getDay();
    const hour = now.getHours();

    console.log("Day:", day);
    console.log("Hour:", hour);

    const workingDay = day >= 1 && day <= 5;
    const workingHour = hour >= 9 && hour < 17;

    if (workingDay && workingHour) {
        next();
    } else {
        res.send("Sorry, the website is available Monday to Friday, from 9 to 17.");
    }
};
app.use(checkWorkingHours);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/services", (req, res) => {
    res.render("services");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});