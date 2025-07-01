import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "yourUsername";
const yourPassword = "yourPassword";
const yourAPIKey = "yourAPIKey";
const yourBearerToken = "yourBearerToken";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  axios.get(`${API_URL}random`)
    .then(response => {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching data");
    });
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  axios.get(`${API_URL}all`, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
    params: {
      page: 2,
    },
  })
    .then(response => {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching data");
    });
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  axios.get(`${API_URL}filter`, {
    params: {
      apiKey: yourAPIKey,
      score: 5,
    },
  })
    .then(response => {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching data");
    });
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  axios.get(`${API_URL}secrets/42`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    },
  })
    .then(response => {
      res.render("index.ejs", { content: JSON.stringify(response.data) });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error fetching data");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
