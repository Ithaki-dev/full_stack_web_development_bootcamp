// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";
import morgan from 'morgan';

const app = express();
const port = 3000;
//  Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
// API URL and Bearer Token
const API_URL = "https://secrets-api.appbrewery.com";
const yourBearerToken = "659ff318-f97e-41d6-b0f1-58270a7247de";
// Logging middleware
app.use(morgan('dev'));

app.get("/", async (req, res) => {
    try {
    const response = await axios.get(`${API_URL}/random`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }
    });
    res.render("index.ejs", { secret: response.data.secret, user: response.data.username });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
