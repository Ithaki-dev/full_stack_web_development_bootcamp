import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import morgan from "morgan";


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});



app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          req.login(result.rows[0], (err) => {
            if (err) {
              console.error("Error logging in user:", err);
              res.redirect("/login");
            } else {
              console.log("User registered and logged in successfully");
              res.redirect("/secrets");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
    } else {
      console.log("User logged out successfully");
      res.redirect("/");
    }
  });
});


passport.use(
  new Strategy(( async function verify(username, password, cb) {
    console.log("Email:", username, "Password:", password);
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isValidPassword);
        if (isValidPassword) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Incorrect password." });
        }
      } else {
        return cb(null, false, { message: "User not found." });
      }
    } catch (err) {
      return cb(err);
    }
    
  }
)));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
