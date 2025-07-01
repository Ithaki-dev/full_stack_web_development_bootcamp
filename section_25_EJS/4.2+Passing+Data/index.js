import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const instruction = "Enter your name:";
  res.render("index", { data : instruction });
});

app.post("/submit", (req, res) => {
  const first_name = req.body.fName;
  const last_name = req.body.lName;
  // Count the number of characters in first_name and last_name
  const total_characters = first_name.length + last_name.length;

  res.render("index", { data: `Hello, ${first_name} ${last_name}! You have ${total_characters} characters in your name.` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
