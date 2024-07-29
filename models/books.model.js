const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book Title is required"],
    },
    author: {
      type: String,
      required: [true, "Book author name is required"],
    },
    genre: {
      type: [String],
    },
    available: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
