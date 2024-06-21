import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/authroute.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb+srv://sapnavishnoi105:UserPassword@cluster0.yttqtbz.mongodb.net/blog-post?retryWrites=true&w=majority&appName=Cluster0').then(
    ()=>{
        console.log("Database is connected!!")
    }
).catch((err)=>{
    console.log('Error:', err)
})

app.listen(5002, ()=>{
    console.log("port is running on 5001!")
});


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message ||  'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})