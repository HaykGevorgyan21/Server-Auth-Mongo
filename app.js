import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';


mongoose.set('strictQuery', false);


const app = express();

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended:true}))

// ------- Routes --------
app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);

// ------- MongoDB connection -------
async function start() {
    const PORT = process.env.PORT

    try {
        await mongoose.connect(`mongodb+srv://Hayk:025261095@cluster0.jhvhzsu.mongodb.net/App?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
    } catch (err) {
        console.log(err);
    }
}

start();

