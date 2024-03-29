const express = require("express");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandling = require("./middleware/errorHandling");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const middleware = require('./middleware/localAuth')
const connectDB = require('./config/db');
const flash = require('connect-flash')
///////////////////////////////////////////////////////////////
connectDB();
const app = middleware.app;
app.use(flash())
app.use(express.json());
///////////////////////////////////////////////////////////////
app.use(loggingMiddleware);
///////////////////////////////////////////////////////////////
app.use('/post',postRoutes);
app.use('/user',userRoutes);
///////////////////////////////////////////////////////////////
app.use(errorHandling);
///////////////////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Your server listening to the ${PORT}`));