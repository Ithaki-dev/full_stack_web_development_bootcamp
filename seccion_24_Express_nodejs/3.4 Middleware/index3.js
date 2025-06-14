import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next) {
  const currentDate = new Date();
  console.log(
    `Request received at ${currentDate.toISOString()} for ${req.method} ${req.url}`
  );
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
