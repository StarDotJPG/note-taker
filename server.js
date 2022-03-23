const express = require('express');
const { hostname } = require('os');
const PORT = process.env.PORT || 3001
const app = express()

require('os');

const path = require('path')

// parse incoming JSON data
app.use(express.json());
const { notes } = require('./data/db.json')
const fs = require('fs')
//API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, "./data/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

app.post('/api/notes', (req, res) => {
    //if (!validateAnimal(req.body)) {
    //    res.status(400).send('The animal is not properly formatted.');
    //} else {
        //add the new note to the json file and return the new note
        res.json(createNewNote(req.body, notes));
    //}
})

//HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, "/public/index.html"))
//})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`)
    console.log(`Server hostname: http://${hostname()}:${PORT}`)
})