const bookModel = require("../models/books.model");

const createBook = async (req, res) => {
  try {
    const { title, author, genre, available } = req.body;
    const newBook = await bookModel.create({ title, author, genre, available });
    res.status(201).json({ success: true, message: "new book added", newBook });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

module.exports = createBook;
