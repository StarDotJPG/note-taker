const { createNewNote } = require('../../lib/notes.js')
const { notes } = require('../../data/db.json')
const router = require('express').Router()

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    //if (!validateAnimal(req.body)) {
    //    res.status(400).send('The animal is not properly formatted.');
    //} else {
        //add the new note to the json file and return the new note
        res.json(createNewNote(req.body, notes));
    //}
})

module.exports = router
