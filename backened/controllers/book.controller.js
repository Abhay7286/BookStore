import Book from "../models/book.model.js";
import redis from "../lib/redis.js";

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