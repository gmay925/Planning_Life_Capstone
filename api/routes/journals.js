const express = require('express');
const { 
  getJournals,
   getJournal, 
   createJournal, 
   deleteJournal, 
   updateJournal,
} = require('../controllers/journalController');

const router = express.Router();

// GET all journals
router.get('/', getJournals);

// GET single workout
router.get('/:id', getJournal);

// POST new journal
router.post('/', createJournal);

// DELETE a journal
router.delete('/:id', deleteJournal);

// UPDATE a journal
router.patch('/:id', updateJournal);

module.exports = router;