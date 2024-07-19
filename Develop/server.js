const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Send all the requests that begin with /notes to the index.js in the routes folder
app.use('/api', api);

// Middleware
app.use(express.static('public'));

// This view route is a GET route for the homepage
app.get('/', (_req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// This view route is a GET route for the notes page
app.get('/notes', (_req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);