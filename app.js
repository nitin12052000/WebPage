const express = require('express');
const app = express();
const fs = require('fs');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define a route for the homepage
app.get('/', (req, res) => {
  // Read the file and parse the JSON data
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const jsonData = JSON.parse(data);
      // Pass the file data to the template
      res.render('index', { data: jsonData });
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return res.status(500).send('Internal Server Error');
    }
  });
});

// Handle the form submission
app.post('/submit', (req, res) => {
  const selectedItems = req.body.selectedItems;
  console.log('Selected Items:', selectedItems);

  // Perform further processing or redirection as needed

  res.send('Form submitted successfully!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
