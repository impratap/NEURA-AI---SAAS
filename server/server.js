import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';


const PORT = process.env.PORT || 3000

const app = express()
await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req,res) =>{
    res.send('server is live')
})

app.use(requireAuth())
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)


app.listen(PORT, ()=>{
    console.log('server is running at', PORT);
    
})