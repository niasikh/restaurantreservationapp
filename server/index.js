const express = require('express');
const generateToken = require('./token-generator');

const app = express();
const port = process.env.PORT || 3000;

// Serve MapKit JS token
app.get('/mapkit-token', (req, res) => {
  try {
    const token = generateToken();
    res.send(token);
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).send('Error generating token');
  }
});

app.listen(port, () => {
  console.log(`Token server listening at http://localhost:${port}`);
}); 