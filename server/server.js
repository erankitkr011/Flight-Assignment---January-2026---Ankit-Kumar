const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");
require('dotenv').config();
// const fileUpload = require('express-fileupload');

const { dbConnect } = require('./config/database');
// const { cloudinaryConnect } = require('./config/cloudinary');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const flightRoutes = require('./routes/flightRoutes');
const walletRouter = require('./routes/walletRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: '*', // This allows all origins
    credentials: true, // Include this if cookies or credentials are involved
}));

// app.use(fileUpload({
//     tempFileDir: "/tmp/",
//     useTempFiles: true,
// }))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/flight', flightRoutes);
app.use('/api/v1/wallet', walletRouter);

// app.get('/', (req, res)=> {
//     return res.status(200).json({
//         success: true,
//         message: "Your server is up and running",
//     });
// });

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// React SPA fallback (SAFE for Node 22+)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorHandler);

dbConnect();
// cloudinaryConnect();

// app.use((err, req, res, next) => {
//     res.status(500).json({
//         success: false,
//         message: err.message || 'Internal Server Error',
//     });
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err)=> {
    if(err) {
        console.log(err.message);  
    } else {
        console.log(`App is running at port ${PORT}`);
    }
})