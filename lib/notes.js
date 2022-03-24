const fs = require('fs')
const path = require('path')
const uniqid = require('uniqid')

function getNotesArray(pathToDb) {
    let rawdata = fs.readFileSync(pathToDb)
    let notesObj = JSON.parse(rawdata)
    let notesArr = notesObj.notes
    return notesArr
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
    return true
}

function createNewNote(body, notesArray) {
    const note = body
    note.id = uniqid()
    console.log(`Note is: ${JSON.stringify(note)}`)
    try {
        notesArray.push(note)
        fs.writeFileSync(
            path.join(__dirname, "../data/db.json"),
            JSON.stringify({ notes: notesArray }, null, 2)
        );
        return note;
    } catch (e) {
        return `There was an error writing to the database`
    }
}

function deleteNote(idToDel, notesArray) {
    // create a new filtered array that contains everything except the ID we want to delete
    const filteredNotesArray = notesArray.filter(note => {
        return note.id != idToDel
    })
    // if the filtered array is different from the original array, we know an item was deleted
    if (notesArray.length != filteredNotesArray.length) {
        // write the new filtered array back to the db.json file
        try {
            fs.writeFileSync(
                path.join(__dirname, "../data/db.json"),
                JSON.stringify({ notes: filteredNotesArray }, null, 2)
            );
            return `Note with ID: ${idToDel} has been deleted`;
        } catch (e) {
            return `There was an error writing to the database`
        }
    } 
    // if arrays are identical, nothing was deleted
    else {
        return `No note with ID: ${idToDel} exists`
    }
}

module.exports = { createNewNote, validateNote, deleteNote, getNotesArray }