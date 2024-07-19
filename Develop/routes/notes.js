const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// This API route is a GET route for obtaining all existing notes
notes.get('/', (_req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// This API route is a POST route for adding a new note
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body    
    const { title, text } = req.body;

    if (title && text) {
        const newNote = { 
            title, 
            text,
            id: uuid(),
         };

        readAndAppend(newNote, './db/db.json');

        // Send a message to the client
        const response = {
            status: 'success',
            body: newNote
        };
        res.status(201).json(response);
    } else {
        res.status(500).json({ error: 'Title and text are required' });
    }
});

// This API route is a DELETE route to delete a note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.status(200).json({ message: `Note ${noteId} has been deleted` });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the note' });
      });
  });

module.exports = notes;