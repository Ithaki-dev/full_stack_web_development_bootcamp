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
app.use(morgan('dev'));
// API URL and Bearer Token
const API_URL = "https://freesound.org/apiv2";
const FREESOUND_TOKEN = "B2bMqWt8Q4zYTUiezJvpcPswL5LeU1EfNqtHqHXW";

app.get('/', async (req, res) => {
  const query = req.query.q;
  let results = [];

  if (query) {
    try {
      const searchRes = await axios.get('https://freesound.org/apiv2/search/text/', {
        params: { query, page_size: 10, filter: 'duration:[0.5 TO 10]', sort: 'score' },
        headers: { Authorization: `Token ${FREESOUND_TOKEN}` }
      });

      // Obtener previews llamando a cada /sounds/<id>/
      const soundPromises = searchRes.data.results.map(async (sound) => {
        try {
          const detail = await axios.get(`https://freesound.org/apiv2/sounds/${sound.id}/`, {
            headers: { Authorization: `Token ${FREESOUND_TOKEN}` }
          });

          return {
            id: detail.data.id,
            name: detail.data.name,
            duration: detail.data.duration,
            preview: detail.data.previews['preview-hq-mp3'],
            license: detail.data.license,
            username: detail.data.username
          };
        } catch (e) {
          return null; // Omitir si da error
        }
      });

      results = (await Promise.all(soundPromises)).filter(Boolean);

    } catch (err) {
      console.error('Error al buscar sonidos:', err.message);
    }
  }

  res.render('index', { results, query });
});



app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
