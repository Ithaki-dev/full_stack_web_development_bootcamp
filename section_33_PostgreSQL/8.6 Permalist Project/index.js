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
  database: "permalist",
  password: "postgres",
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

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

// Funcition to fetch items from the database
const fetchItems = async () => {
  try {
    const res = await db.query("SELECT * FROM items");
    items = res.rows;
    // items dictionary to match the expected format
    return items.map(item => ({ id: item.id, title: item.title }));
  } catch (err) {
    console.error("Error fetching items", err);
  }
};



app.get("/", async (req, res) => {
  items = await fetchItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  db.query("INSERT INTO items (title) VALUES ($1)", [item], (err) => {
    if (err) {
      console.error("Error inserting item", err);
    }
  });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  db.query("UPDATE items SET title = $1 WHERE id = $2", [title, id], (err) => {
    if (err) {
      console.error("Error updating item", err);
    }
  });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  db.query("DELETE FROM items WHERE id = $1", [id], (err) => {
    if (err) {
      console.error("Error deleting item", err);
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
