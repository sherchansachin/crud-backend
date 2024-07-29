require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bookModel = require("./models/books.model");
const app = express();
const connectDB = require("./config/database");
const booksRouter = require("./routes/booksRoute");
const booksSearch = require("./routes/bookSearch");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//base url
app.use("/api/books", booksRouter);
app.use("/api/search", booksSearch);

app.get("/", (req, res) => {
  res.json({ msg: "Hello world" });
});

const PORT = process.env.PORT || 5000;

app.post("/api/books");

app.get("/api/books", async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({ success: true, books, totalBooks: books.length });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET a single book from id
app.get("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // database query
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT request to update a book by id
app.put("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ success: true, message: "Book not found" });
    }
    res.status(200).json({ success: true, message: "Book data updated", book });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//delete req
app.delete("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully", book });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: err.message,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
