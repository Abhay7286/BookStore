import Book from "../models/book.model.js";
import redis from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json({books});
    } catch (error) {
        console.log("error in getAllBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getFeaturedBooks = async (req, res) => {
    try {
        let featuredBooks = await redis.get("featured_books");
        if (featuredBooks) {
            return res.json(JSON.parse(featuredBooks));
        } 
        //if not in redis, fetch from mongodb 
        //.lean() is used to convert mongoose object to plain javascript object
        featuredBooks = await Book.find({isFeatured: true}).lean();

        if(!featuredBooks){
            res.status(404).json({message: "No featured books found"});
        }

        //store in redis for future access
        await redis.set("featured_books", JSON.stringify(featuredBooks));
        res.json(featuredBooks);
    } catch (error) {
        console.log("error in getFeaturedBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getBooksByAuthor = async (req, res) =>{
    const {author} = req.params;
    try {
        const books = await Book.find({ author: { $in: [author] } });
        res.json(books);
    } catch (error) {
        console.log("error in getBooksByAuthor controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const createBooks = async (req, res) => {
    try {
        const {title, author, description, genre, price, image} = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "books",
            });
        }

        const book = await Book.create({
            title:title.toLowerCase(),
            author: author.toLowerCase(),
            description,
            genre: genre.toLowerCase(),
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : ""
        });

        res.status(201).json(book);
    } catch (error) {
        console.log("error in createBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const deleteBook = async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book){ 
            res.status(404).json({message: "Book not found"});
         }
        
         if(book.image){
           const publicId = book.image.split("/").pop().split(".")[0];

           try {
             await cloudinary.uploader.destroy(publicId);
             console.log("Image deleted from cloudinary");  
           } catch (error) {
             console.log("error in deleting image from cloudinary", error.message);
           }

         }

         await Book.findByIdAndDelete(req.params.id);

         res.status(200).json({message: "Book deleted successfully"});
    } catch (error) {
        console.log("error in deleteBook controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getRecommendedBooks = async (req, res) => {
    try {
        const books = await Book.aggregate([
            {$sample: {size: 8}},
            {$project: {_id:1, title:1, author:1, image:1, genre:1, price:1, description:1}}
        ])

        res.json(books);
    } catch (error) {
        console.log("error in getRecommendedBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getBooksByGenre =  async (req, res) => {
    const {genre} = req.params;
    try {
        const books = await Book.find({genre});
        res.json(books);
    } catch (error) {
        console.log("error in getBooksByGenre controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const toggleFeaturedBooks = async (req,res) =>{
    const book = await Book.findById(req.params.id);
    try {
        if(book){
            book.isFeatured = !book.isFeatured;
            const updatedBook = await book.save();
            await updateFeaturedBooksCache();
            res.json(updatedBook);
        }else{
            res.status(404).json({message: "Book not found"});
        }
        
    } catch (error) {   
        console.log("error in toggleFeaturedBooks controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const updateFeaturedBooksCache = async () => {
    try {
        const featuredBook = await Book.find({isFeatured: true}).lean();
        await redis.set("featured_books", JSON.stringify(featuredBook));
    } catch (error) {
        console.log("error in updateFeaturedBooksCache function", error.message);
    }
}