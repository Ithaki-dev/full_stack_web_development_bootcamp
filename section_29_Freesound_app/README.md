# 🎵 Sample Finder

A retro-styled web application for searching and playing audio samples from the Freesound API. Built with Node.js, Express, and EJS with a cyberpunk aesthetic.

## 🌟 Features

- **Audio Search**: Search through thousands of audio samples from Freesound
- **Audio Player**: Interactive waveform visualization with Wavesurfer.js
- **Retro UI**: Cyberpunk/retro gaming inspired design
- **Responsive**: Works on desktop and mobile devices
- **Download**: Direct download links for audio samples
- **Real-time Playback**: Play, pause, and stop audio samples

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap 5, Wavesurfer.js
- **API**: Freesound API v2
- **Styling**: Custom CSS with retro/cyberpunk theme
- **HTTP Client**: Axios
- **Middleware**: Morgan (logging), Body-parser

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Freesound API Token

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd sample-finder
   ```

2. **Install dependencies**
   ```bash
   npm install express axios body-parser morgan ejs
   ```

3. **Set up API Token**
   - Get a free API token from [Freesound.org](https://freesound.org/help/developers/)
   - Replace the `FREESOUND_TOKEN` in `index.js` with your token:
   ```javascript
   const FREESOUND_TOKEN = "YOUR_API_TOKEN_HERE";
   ```

4. **Run the application**
   ```bash
   npm start
   # or
   node index.js
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
/sample-finder
  |-- index.js                 # Main server file
  |-- package.json            # Dependencies and scripts
  |-- /views
      |-- index.ejs           # Main template
  |-- /public
      |-- styles.css          # Custom retro styling
      |-- wavesurfer-init.js  # Audio player initialization
```

## 🎮 Usage

1. **Search**: Enter keywords in the search bar (e.g., "drums", "guitar", "nature")
2. **Play**: Click the play button to hear audio samples
3. **Visualize**: Watch the interactive waveform while playing
4. **Download**: Click download to save samples locally
5. **Navigate**: Use play, pause, and stop controls

## 🎨 Design Features

- **Neon Colors**: Cyan, pink, and purple color scheme
- **Retro Fonts**: Orbitron and Press Start 2P fonts
- **Gradient Backgrounds**: Dark cyberpunk gradients
- **Interactive Elements**: Glowing buttons and hover effects
- **Responsive Layout**: Adapts to different screen sizes

## 🔧 Configuration

### API Settings
- **Page Size**: 10 results per search
- **Duration Filter**: 0.5 to 10 seconds
- **Sort**: By relevance score
- **Audio Quality**: High-quality MP3 previews

### Customization
- Modify `styles.css` to change the theme
- Update search parameters in `index.js`
- Adjust audio player settings in `wavesurfer-init.js`

## 📝 Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file:
   ```
   FREESOUND_TOKEN=your_api_token_here
   PORT=3000
   ```

2. Install dotenv:
   ```bash
   npm install dotenv
   ```

3. Update `index.js`:
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   
   const FREESOUND_TOKEN = process.env.FREESOUND_TOKEN;
   const port = process.env.PORT || 3000;
   ```

## 🐛 Troubleshooting

- **No audio playing**: Check if the Freesound API token is valid
- **Search not working**: Verify internet connection and API limits
- **Styling issues**: Ensure `styles.css` is loaded correctly
- **Console errors**: Check browser developer tools for JavaScript errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 🔗 Links

- [Freesound API Documentation](https://freesound.org/docs/api/)
- [Wavesurfer.js Documentation](https://wavesurfer-js.org/)
- [Express.js Documentation](https://expressjs.com/)

## 👨‍💻 Author

Created with ❤️ for music producers and sound designers.

---

**Happy sampling!