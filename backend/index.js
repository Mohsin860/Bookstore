import express, { response } from 'express'
import {PORT, mongoDBUrl} from './config.js'
import mongoose from 'mongoose';
import { bookRoute } from './routes/BookRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Option one
app.use(cors());

//Option two 
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET' , 'POST', 'PUT' , 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))


app.get('/', (request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to BookStore');
})

app.use('/books', bookRoute );

mongoose.connect(mongoDBUrl)
.then(() => {
    console.log('MongoDB Connected Succesfull');
    app.listen(PORT, ()=>{
    console.log(`Server is running on: ${PORT}`);
});
}) 
.catch((error)=> {
    console.log(error);
})

