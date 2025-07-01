import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("combined"));
// Middleware to log the request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call the next middleware or route handler
});
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
