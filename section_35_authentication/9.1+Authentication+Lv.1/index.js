import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bycrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "admin123",
  port: 5432,
});

db.connect(
  (err) => {
    if (err) {
      console.error("Database connection error:", err);
    } else {
      console.log("Connected to the database");
    }
  }
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  // save user data to the database
  const email = req.body.username;
  const password = req.body.password;

  const checkUserExists = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  try {
    if (checkUserExists.rows.length > 0) {
      console.log("User already exists");
      res.redirect("/register");
    } else {
      // Hash the password before storing it
      bycrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          res.status(500).send("Error registering user");
          return;
        }
        await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2)",
          [email, hash]
        );
        console.log("User registered successfully");
        res.redirect("/");
      });
    }
  
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      const isValidPassword = await bycrypt.compare(
        password,
        user.rows[0].password
      );
      if (isValidPassword) {
        console.log("Login successful");
        res.redirect("/secrets");
      } else {
        console.log("Invalid password");
        res.redirect("/login");
      }
    } else {
      console.log("User not found");
      res.redirect("/register");
    }
  } catch (err) {
    console.log(err);
  }
});



app.get("/secrets", async (req, res) => {
  res.render("secrets.ejs");
});

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port) ;
});
