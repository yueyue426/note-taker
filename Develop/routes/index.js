const router = require('express').Router();

// Import files containing routes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;