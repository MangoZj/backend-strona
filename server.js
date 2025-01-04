require('dotenv').config(); // Załadowanie zmiennych środowiskowych z pliku .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Obsługa CORS
const bodyParser = require('body-parser'); // Parsowanie JSON w żądaniach

const app = express();
const PORT = process.env.PORT || 3001; // Port serwera

// Middleware
app.use(cors()); // Umożliwia dostęp do API z innych domen
app.use(bodyParser.json()); // Parsowanie JSON w żądaniach
app.use(bodyParser.urlencoded({ extended: true })); // Obsługa danych w formularzach

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Połączono z MongoDB');
  })
  .catch((err) => {
    console.error('Błąd połączenia z MongoDB:', err.message);
  });

// Testowy endpoint API
app.get('/api/test', (req, res) => {
  res.send('API działa!');
});

// Endpoint dla Cloudinary (przesyłanie obrazów)
app.post('/api/upload', (req, res) => {
  const { image } = req.body; // Oczekiwany URL obrazu w żądaniu
  const cloudinary = require('cloudinary').v2;

  cloudinary.uploader.upload(image, { folder: 'your-folder-name' }, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Błąd podczas przesyłania obrazu' });
    }
    res.status(200).json({ url: result.secure_url });
  });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
