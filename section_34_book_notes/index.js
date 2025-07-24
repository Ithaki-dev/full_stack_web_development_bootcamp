import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import morgan from "morgan";

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

 


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { title, author, year } = req.body; 

  db.query(
    "INSERT INTO books (title, author, year) VALUES ($1, $2, $3)",
    [title, author, year],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Error adding book");
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/edit/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("SELECT * FROM books WHERE id = $1", [bookId], (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Error fetching book");
    } else {
      res.render("edit", { book: result.rows[0] });
    }
  });
});

app.post("/edit/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, author, year } = req.body;
  db.query(
    "UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4",
    [title, author, year, bookId],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err.stack);
        res.status(500).send("Error updating book");
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/delete/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE id = $1", [bookId], (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Error deleting book");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
