import express from 'express'
import { Book } from '../models/BookModel.js';
const route = express.Router();

route.post('/', async(request, response)=>{
    try {
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message: " Enter title, autor, publishYear"});
        }
        const newBook =  {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

route.get('/', async(request, response) => {
    try {
        const book = await Book.find({})
        response.status(200).json({
            count : book.length,
            data : book
            });

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message});        
    }
})

route.get('/show/:id' , async(request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        response.status(200).json(book);
    } catch (error) {
        console.log(error.message)
        response.status(400).send({message: error.message});
    }
} )

route.put('/edit/:id' , async(request, response)=> {
    try {
        const {id} = request.params;
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishYear
        ){
            response.status(400).send({message: "Title, Author, publishYear are Required!"})
        }
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).send({message: "Book Not Found"})
        }

        response.status(200).send({message: "Book Updated Successfully"});

        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
}
)

route.delete('/delete/:id', async(request, response) => {
    try {
        const {id} = request.params;

        const result = Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message: "No Book Found"})
        }
        response.status(200).send({message: "Book Deleted Successfully"});
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});        
    }
})


export const bookRoute = route;

