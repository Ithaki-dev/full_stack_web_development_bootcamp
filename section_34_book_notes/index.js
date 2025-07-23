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