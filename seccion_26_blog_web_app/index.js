import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const posts = []; // Add this line to store posts
// example posts for demonstration
posts.push({
  id: 1,
  title: "First Post",
  content: "This is the content of the first post.",
  date: new Date().toLocaleDateString(),
});
posts.push({
  id: 2,
  title: "Second Post",
  content: "This is the content of the second post.",
  date: new Date().toLocaleDateString(),
});
posts.push({
  id: 3,
  title: "Third Post",
  content: "This is the content of the third post.",
  date: new Date().toLocaleDateString(),
});

// Middleware to handle form submissions
app.post("/add", (req, res) => {
  const { title, content } = req.body;

  // Create a new post object
  const newPost = {
    id : posts.length + 1, // Simple ID generation
    title,
    content,
    date: new Date().toLocaleDateString(),
  };

  // Add the new post to the posts array
  posts.push(newPost);

  // Redirect to the home page
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home" , posts });
});

app.get("/add", (req, res) => {

  // Render the add post page
  res.render("add", { title: "Add Post", posts });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});