const bookModel = require("../models/books.model");

const searchBook = async (req, res) => {
  try {
    const genres = req.query.genre;
    const genresArray = genres.split(","); // Convert to an array
    const books = await bookModel.find({ genre: { $in: genresArray } });
    if (books.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No books found for this genre" });
    }

    res.status(200).json({ success: true, books, totalBooks: books.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = searchBook;
