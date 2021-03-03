const express = require('express');
const app = express();
const profileRoutes = require("./routes/profile.route")
const userRoutes = require("./routes/user.route");
const errorHandler = require("./middlewares/errorHandler");


app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);

app.use(errorHandler);


module.exports = app;