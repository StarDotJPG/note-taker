const { createNewNote, validateNote, deleteNote, getNotesArray } = require('../../lib/notes.js')
const path = require('path')
const pathToDb = path.resolve(__dirname, '../../data/db.json')
const router = require('express').Router()

router.get('/notes', (req, res) => {
    res.json(getNotesArray(pathToDb))
})

router.post('/notes', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        //add the new note to the json file and return the new note
        newNote = createNewNote(req.body, getNotesArray(pathToDb));
        res.json(newNote)
    }
})

router.delete('/notes/:id', (req, res) => {
    res.json(deleteNote(req.params.id, getNotesArray(pathToDb)));
})

module.exports = router
