import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "c0n547udr7",
  port: 5432,
});

db.connect(
  (err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database");
    }
  }
);

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    const totalCountries = result.rows.length;
    console.log(result.rows.map(row => row.country_code));
    res.render("index", { countries: result.rows.map(row => row.country_code), total: totalCountries });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving countries");
  }

});

app.post("/add", async (req, res) => {
  const country = req.body.country.trim();
  if (!country) {
    return res.status(400).send("Country name cannot be empty");
  }
  
  // Capitalize first letter
  const capitalizedCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  
  try {
    // Search the code for the country
    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [capitalizedCountry]);
    if (result.rows.length === 0) {
      return res.status(404).send("Country not found");
    }
    const countryCode = result.rows[0].country_code;
    // Insert the country code into visited_countries
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    console.log(`Added country: ${countryCode}`);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding country");
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
