import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
        },
        author: {
            type: String,
            required: [true, "author is required"],
        },
        description: {
            type: String,
            required: [true, "description is required"],
        },
        genre: {
            type: String,
            required: [true, "genre is required"],
        },
        price: {
            type: Number,
            required: [true, "price is required"],
        },
        image: {
            type: String,
            required: [true, "image is required"],
        },
    },    
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
