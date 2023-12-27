const cors = require('cors');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu'); // Import menuRoutes
const dailyMenuRoutes = require('./routes/dailymenu'); // Import dailyMenuRoutes
const prisma = require("./lib/prisma");
const userRoutes = require('./routes/user');
const { Logout, getUserDetails } = require('./controllers/userController');
const { getDailyMenu } = require('./controllers/dailymenuController');
const reservationRoutes= require('./routes/reservation');
const orderRoutes= require('./routes/order');
const objednavkyRoutes = require('./routes/checkorder');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.options('*', cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie:{httpOnly:false}
  })
);
app.use('/api', userRoutes);
app.use("/api/user",getUserDetails)
app.use("/api/logout",Logout)
app.use('/menu', menuRoutes); // Use menuRoutes for the '/menu' endpoint
app.use('/reservation', reservationRoutes); // Use menuRoutes for the '/menu' endpoint
app.use("/order",orderRoutes);
app.use('/api/dailymenu', dailyMenuRoutes); // Use dailyMenuRoutes for the '/dailymenu' endpoint
app.use('/objednavky', objednavkyRoutes);
// Handling preflight request

app.listen(5000, async () => {
  console.log('Server is running on port 5000');
});
