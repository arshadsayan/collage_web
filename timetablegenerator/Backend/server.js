const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  // Process the form data here (e.g., save to database)

  res.send({ message: 'Form data received successfully', formData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
