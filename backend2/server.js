const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');
const dailyMenuRoutes = require('./routes/dailymenu');
const prisma = require("./lib/prisma");
const userRoutes = require('./routes/user');
const { Logout, getUserDetails } = require('./controllers/userController');
const reservationRoutes = require('./routes/reservation');
const orderRoutes = require('./routes/order'); // Ensure this is correctly imported

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: false }
  })
);

app.use('/api', userRoutes);
app.use("/api/user", getUserDetails);
app.use("/api/logout", Logout);
app.use('/menu', menuRoutes);
app.use('/reservation', reservationRoutes);
app.use('/api/dailymenu', dailyMenuRoutes);
app.use('/order', orderRoutes); // Make sure this line is here

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
