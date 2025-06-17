import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const days = [
    "Sunday: Relax and recharge!",
    "Monday: Start your week strong!",
    "Tuesday: Keep the momentum going!",
    "Wednesday: Halfway there!",
    "Thursday: Almost the weekend!",
    "Friday: Finish strong!",
    "Saturday: Enjoy your day off!"
  ];
  const today = new Date().getDay();
  res.send(`<h1>${days[today]}</h1>`);
});

app.listen(port, () => {
  console.log(`Advice app listening on port ${port}`);
});