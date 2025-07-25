import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import morgan from "morgan";
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "ejs");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "book",
  password: "admin123",
  port: 5432,
});

db.connect(
  (err) => {
    if (err) {
      console.error("Connection error", err.stack);
    } else {
      console.log("Connected to the database");
    }
  }
);

class Book {
  constructor(id, title, author, description, cover) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.cover = cover;
  }
}
// Search for books in google books API
function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

  return axios.get(url)
    .then(response => {
      if (response.data.items) {
        return response.data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
          description: item.volumeInfo.description || "No description available",
          cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "./img/no_cover.png"
        }));
      }
      return [];
    })
    .catch(error => {
      console.error("Error searching books:", error);
      throw error;
    });
}

function getBooks(callback) {
  db.query("SELECT * FROM books", (err, res) => {
    if (err) {
      return callback(err);
    }
    const books = res.rows.map(
      (row) => new Book(row.id, row.title, row.author, row.description, row.cover)
    );
    callback(null, books);
  });

}

app.get("/", (req, res) => {
  getBooks((err, books) => {
    if (err) {
      console.error("Error fetching books:", err);
      return res.status(500).send("Error fetching books");
    }
    res.render("index", { books });
  });
});

app.get("/add/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    // Buscar el libro por ID en la API de Google Books
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    const response = await axios.get(url);
    
    if (response.data) {
      const book = {
        id: response.data.id,
        title: response.data.volumeInfo.title,
        author: response.data.volumeInfo.authors ? response.data.volumeInfo.authors.join(", ") : "Unknown",
        description: response.data.volumeInfo.description || "No description available",
        cover: response.data.volumeInfo.imageLinks ? response.data.volumeInfo.imageLinks.thumbnail : "./img/no_cover.png"
      };
      
      res.render("add_book", { book, error: null });
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).send("Error fetching book details");
  }
});

app.post("/add/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, description, cover } = req.body;
  // console.log("Adding book:", { id, title, author, description, cover });
  
  try {
    const query = "INSERT INTO books (title, author, description, cover) VALUES ($1, $2, $3, $4)";
    const values = [title, author, description, cover];

    db.query(query, values, (err) => {
      if (err) {
        console.error("Error inserting book:", err);
        return res.status(500).send("Error inserting book");
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Error adding book");
  }
});

app.post("/search", async (req, res) => {
// Get the input from the search form
  const query = req.body.search;

  console.log("Search query:", query);

  try {
    const results = await searchBooks(query);
    res.render("search_book", { books: results });
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).send("Error searching books");
  }
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  console.log("Editing book with ID:", id);
  db.query("SELECT * FROM books WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.error("Error fetching book for edit:", err);
      return res.status(500).send("Error fetching book for edit");
    }
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    const book = result.rows[0];
    res.render("edit_book", { book });
  });
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, description, cover } = req.body;
  const query = "UPDATE books SET title = $1, author = $2, description = $3, cover = $4 WHERE id = $5";
  const values = [title, author, description, cover, id];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Error updating book:", err);
      return res.status(500).send("Error updating book");
    }
    res.redirect("/");
  });
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log("Deleting book with ID:", id);
  db.query("DELETE FROM books WHERE id = $1", [id], (err) => {
    if (err) {
      console.error("Error deleting book:", err);
      return res.status(500).send("Error deleting book");
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});