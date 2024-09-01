const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute.js');
const jobRoute = require('./routes/jobRoute.js');
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors');
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({origin: 'https://quiz-builder-front.vercel.app'}));
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.use('/user',userRoute);
app.use('/job',jobRoute);

app.get('/health', (req,res)=>{
    res.json({
        message : 'Job Listing API is working fine',
        status : 'Working',
        date : new Date().toLocaleDateString()
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}`);
});

//another way to write and connect with MongoDb
// app.listen(PORT, () => {
//     mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log(`Server is running on PORT ${PORT}`))
//     .catch((error) => { console.log('authentication failed : '+ error)})
// })
